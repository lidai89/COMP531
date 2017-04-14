//default profile for dl37
let defaultProfile = {
	username: 'dl37',
	email: 'dl37@rice.edu',
	zipcode: '77027',
	avatar:'http://www.aiyellowpage.com/content/wp-content/uploads/2016/03/google-alphago-logo-540x334.png',
	dob:new Date('1989-04-16'),
	headline: 'Becoming a JavaScript Developer'
}


const getHeadLines = (req, res) => {
	const users = req.params.users ? req.params.users.split(','): [defaultProfile.username];
	res.status(200).send({ headlines: users.map((user)=>{
			if(user===defaultProfile.username){
				return {username:user, headline:defaultProfile.headline}
			}
			else{
				return {username:user, headline:'Becoming a JavaScript Developer'}
			}
		})
	})
}


const putHeadLines = (req, res) => {
	const username = defaultProfile.username
	const headline = req.body.headline
	if(!headline){
		res.status(400).send("empty")
	}
	else{
		defaultProfile.headline = headline
		res.status(200).send({username, headline})
	}
}


const getEmail  = (req, res) => {
	const username = req.params.user ? req.params.user: defaultProfile.username
	const email = username===defaultProfile.username? defaultProfile.email: 'dl37@rice.edu'
	res.status(200).send({username,email})
}


const putEmail = (req, res) => {
	const username = defaultProfile.username
	const email = req.body.email
	if(!headline){
		res.status(400).send("empty")
	}
	else{
		defaultProfile.email = email
		res.status(200).send({username, email})
	}
}


const getZipcode = (req, res) => {
	const username = req.params.user ? req.params.user: defaultProfile.username
	const zipcode = username===defaultProfile.username ? defaultProfile.zipcode: '77027'
	res.status(200).send({username,zipcode})
}


const putZipcode = (req, res) => {
	const username = defaultProfile.username
	const zipcode = req.body.zipcode
	if(!headline){
		res.status(400).send("You do not supply zipcode!")
	}
	else{
		defaultProfile.zipcode = zipcode
		res.status(200).send({username, zipcode})
	}
}


const getAvatar = (req, res) => {
	const users = req.params.user ? req.params.user.split(','): [defaultProfile.username];
	res.status(200).send({ avatars: users.map((user)=>{
			if(user===defaultProfile.username){
				return {username:user, avatar:defaultProfile.avatar}
			}
			else{
				return {username:user, avatar:'http://www.aiyellowpage.com/content/wp-content/uploads/2016/03/google-alphago-logo-540x334.png'}
			}
		})
	})
}


const putAvatar = (req, res) => {
	const username = defaultProfile.username
	const avatar = req.body.avatar
	if(!avatar){
		res.status(400).send("empty")
	}
	else{
		defaultProfile.avatar = avatar
		res.status(200).send({username, avatar})
	}
}


const getDob = (req, res) => {
	const username = req.params.user ? req.params.user: defaultProfile.username
	const dob = username===defaultProfile.username ? defaultProfile.dob: new Date("1989-04-16")
	res.status(200).send({username,dob})
}
const uploadAvatar=(req,res)=>{
	res.status(200).send({username:"test",avatar:req.fileurl})
}
const uploadImage = require('./uploadCloudinary')
//     app.put('/avatar', uploadImage('avatar'), uploadAvatar)
module.exports = app => {
    app.get('/headlines/:user?',getHeadLines)
    app.put('/headline',putHeadLines)

    app.get('/email/:user?',getEmail)
    app.put('/email',putEmail)

    app.get('/zipcode/:user?',getZipcode)
    app.put('/zipcode',putZipcode)
    
    app.get('/avatars/:user?',getAvatar)
    app.put('/avatar', uploadImage('avatar'), uploadAvatar)

    app.get('/dob', getDob)
}