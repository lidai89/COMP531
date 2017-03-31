const md5 = require('md5')
var User = require('./model.js').User


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


function findByUsername(username, callback) {
	User.find({ username }).exec(function(err, items) {
		console.log(items);	
		callback(items);
	})
}


const registerAction = (req, res) => {
	console.log('Payload received', req.body);
	const username = req.body.username;
	const password = req.body.password;
	findByUsername(username, function(items){
		if(items.length !== 0){ 
			res.status(400).send({result:"User already exist!"})
			return;
		}
		else{
			const mySalt = randomSalt(saltLength)
			new User({username:username, salt:mySalt, hash: saltedHash(password,mySalt)}).save(function(){
				res.status(200).send({result:"Succeed!"})
				return;
			});
		}
	});
}


const loginAction = (req,res) => {
	console.log('Payload received: ', req.body);
	const username = req.body.username;
	const password = req.body.password;
	if(!username || !password){
		res.status(400).send({result:"Invalid input!"});
		return;
	}

	findByUsername(username, (items)=>{
		if(items.length===0){
			res.status(401).send({result:"No such user exist!"})
			return;
		}
		else{
			//Get them from DB
			const salt = items[0].salt; 
			const hash = items[0].hash;
			if(saltedHash(password, salt)!=hash){
				res.status(401).send({result:"Wrong password!"})
				return;
			}
			else{
				res.cookie(cookieKey, saltedHash(hash,salt), {maxAge:3600*1000, httpOnly:true})
				res.status(200).send({username:username, result:'success'});
				return;
			}
		}
	})
}


module.exports = app => {	
	app.post('/register', registerAction)
	app.post('/login',loginAction)
}