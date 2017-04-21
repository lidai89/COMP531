const md5 = require('md5')
var User = require('../model.js').User
var Profile = require('../model.js').Profile
var cookieParser = require('cookie-parser')
var redis = require('redis').createClient('redis://h:pd28c40df2edc3ba181341c8414d1c865f9a2f2ce8bbbcbdedf87fafa77f102ce@ec2-34-204-242-91.compute-1.amazonaws.com:20629')

const saltLength = 20;
const cookieKey = 'sid';

const randomSalt = (len) =>{
	const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
    	randomString += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return randomString;
}

const saltedHash = (password, salt) =>{
	return md5(password+salt);
}

const findByUsernameInUser = (username, callback)=> {
	User.find({ username }).exec(function(err, items) {
		callback(items);
	})
}

//This queries profileSchema by username
const findByUsernameInProfile = (username, callback)=> {
	Profile.find({ username }).exec(function(err,items){
		callback(items);
	})
}

//validate user is logged in
function isLoggedIn(req, res, next){
	
	let first_login=(req.url=='/login')||(req.url=='/register')
	 if(req.method == 'OPTIONS'){
	 	res.sendStatus(200)
		 console.log(req.url)
		 //console.log(req.headers)
	 	return
	 }
	else if(!req.cookies&&(!first_login)){
		console.log('cookie missing')
		res.status(401).send('Not authorized! No  cookie!')
		return
	}
	else{
		//console.log(req.method)
		console.log(req.url)
		console.log(req.cookies)
    let sid = req.cookies[cookieKey]
	// //console.log(req)
	// if(!sid&&(!first_login)){
	// 	console.log('sid missing')
	// 	res.status(401).send('Not authorized! No cookie with sid!')
	// 	return
	// }
	if(first_login){
		req.username=req.body.username
		console.log('login!')
		//next()
	}
	console.log('sid: '+sid)
	redis.hgetall(sid, function(err,userObject){
		if(userObject && userObject.username){
			req.username = userObject.username;
			console.log('username sid:'+req.username)
			next();
		}
		//if(first_login){next()}
		else{
			//res.status(401).send('Not authorized! Invalid cookie!')
			next()
		}
	})}
}


const loginAction = (req,res)=>{
	const username = req.body.username;
	const password = req.body.password;
	console.log('login  fired')
	console.log(req.body)
	if(!username || !password){
		res.status(400).send({result:"Invalid input!"});
		return;
	}
	findByUsernameInUser(username, (items)=>{
		if(items.length===0){
			res.status(401).send({result:"No such user exist!"})
			return;
		}
		else{
			//validating credentials
			const salt = items[0].salt; 
			const hash = items[0].hash;
			if(saltedHash(password, salt)!=hash){
				res.status(401).send({result:"Wrong password!"})
				return;
			}
			else{console.log(hash)
				let sessionKey = saltedHash(hash,salt)
				redis.hmset(sessionKey,{username})
				//console.log(username)
				res.cookie(cookieKey, sessionKey, {maxAge:3600*1000, httpOnly:true})
				res.status(200).send({username:username, result:'success'});
				return;
			}
		}
	})
}

const logoutAction = (req, res)=>{
	redis.del(req.cookies[cookieKey])
	res.status(200).send('Logout Succeed!')
}

const registerAction = (req, res)=>{
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;
	const dob = req.body.dob;
	const zipcode = req.body.zipcode;
	console.log(req.body);
	if(!username || !password || !email || !dob || !zipcode){
		res.status(400).send({result:"Invalid input!"});
		return;
	}
	findByUsernameInUser(username, function(items){
		if(items.length !== 0){ 
			res.status(400).send({result:"User already exist!"})
			return;
		}
		else{
			const mySalt = randomSalt(saltLength)
			new User({username:username, salt:mySalt, hash: saltedHash(password,mySalt)}).save(()=>{
				new Profile({username:username, email: email, zipcode: zipcode, dob: dob, headline:"New User!",
							avatar:'https://i.ytimg.com/vi/haoytTpv2NU/maxresdefault.jpg',
							following: []}).save(()=>{
					res.status(200).send({result:"Succeed!"})
					return;
				});		
			});
		}
	});
}

const putPassword = (req, res)=>{
	const password = req.body.password;
	const username = req.username;
	if(!password){
		res.status(400).send({result:"Invalid input!"});
	}
	const newSalt = randomSalt(saltLength)
	User.findOneAndUpdate({username}, {salt:newSalt, hash: saltedHash(password, newSalt)},{new:true}, (error,doc)=>{
		if(errot){
			res.status(400).send({error:error})
		}
		else{
			if(item){
				redis.del(req.cookies[cookieKey])
				let newCookie = saltedHash(doc.hash,doc.salt)
				redis.hmset(newCookie,{username})
				res.cookie(cookieKey, newCookie, {maxAge:3600*1000, httpOnly:true})
				res.status(200).send({username, status: 'Password changed!'})
			}
			else{
				res.status(404).send({result:'No matched items!'})
			}
		}
	})
}


module.exports = app => {
	app.use(cookieParser())	
    app.post('/login', loginAction)
    app.post('/register', registerAction)
    app.use(isLoggedIn)
    app.put('/logout', logoutAction)
    app.put('/password',putPassword)
}
