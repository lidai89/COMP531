//default profile for dl37
let defaultProfile = {
	username: 'dl37',
	email: 'dl37@rice.edu',
	zipcode: '77027',
	avatar:'http://www.aiyellowpage.com/content/wp-content/uploads/2016/03/google-alphago-logo-540x334.png',
	dob:new Date('1989-04-16'),
	headline: 'Becoming a JavaScript Developer'
}

var Profile = require('../model.js').Profile
const bodyParser = require('body-parser')
var Article = require('../model.js').Article
var cookieParser = require('cookie-parser')
// new Profile({
// 	username: 'dl37',
// 	email: 'dl37@rice.edu',
// 	zipcode: '77027',
// 	avatar:'http://www.aiyellowpage.com/content/wp-content/uploads/2016/03/google-alphago-logo-540x334.png',
// 	dob:new Date('1989-04-16'),
// 	headline: 'MLAB DB test',
// 	following:[]
// }).save(function() {
// console.log('done with save')})
// new Article({ id: 2, author: 'sep1', img: null, date: new Date().getTime(), text: 'Test test'})
// .save(function() {
// console.log('done with save')})

const getHeadLines = (req, res) => {
	
	const users = req.params.user ? req.params.user.split(','): req.username;
	Profile.find({username:{$in:users}}).exec((err, items)=>{
		if(err){//console.log(users)
			res.status(400).send({error:err})
		}
		else{
			if(items){
				res.status(200).send({ headlines: items.map((item)=>{
					return {username:item.username, headline:item.headline}
				})})
			}
			else{
				res.status(404).send({result:'No matched items!'})
			}
		}
	})
}


const putHeadLines = (req, res) => {
	const username = defaultProfile.username
	const headline = req.body.headline
	console.log(headline)
	console.log(req.headers)
	if(!headline){
		res.status(400).send("empty")
	}
	else{
		Profile.findOneAndUpdate({username},{headline},{new:true,upsert:true},(error,doc)=>{
			if(error){
				res.status(400).send({error:error})
			}
			else{
				if(doc){
					res.status(200).send({username, headline:doc.headline})
				}
				else{
					res.status(404).send({result:'Did not found headline!'})
				}
			}
		})
	}
}


const getEmail  = (req, res) => {
	const users = req.params.user ? req.params.user.split(','): req.username;
	Profile.findOne({username:users}).exec((error,doc)=>{
		if(error){
			res.status(400).send({error:error})
		}
		else{
			if(doc){
				console.log(doc)
				res.status(200).send({ username:doc.username, email:doc.email}
				)
			}
			else{
				res.status(404).send({result:'No matched items!'})
			}
		}
		})
	}


const putEmail = (req, res) => {
	const username = defaultProfile.username
	const email = req.body.email
	if(!email){
		res.status(400).send("empty")
	}
	else{
		Profile.findOneAndUpdate({username},{email},{new:true,upsert:true},(error,doc)=>{
			if(error){
				res.status(400).send({error:error})
			}
			else{
				if(doc){
					res.status(200).send({username, email:doc.email})
				}
				else{
					res.status(404).send({result:'Did not found headline!'})
				}
			}
		})
	}
}


const getZipcode = (req, res) => {
	const users = req.params.user ? req.params.user.split(','): req.username;
	console.log('zipcode session:'+users)
	Profile.findOne({username:users}).exec((error,doc)=>{
		if(error){
			res.status(400).send({error:error})
		}
		else{
			if(doc){
				console.log(doc)
				res.status(200).send({ username:doc.username, zipcode:doc.zipcode}
				)
			}
			else{
				res.status(404).send({result:'No matched items!'})
			}
		}
		})
}


const putZipcode = (req, res) => {
	const username = defaultProfile.username
	const zipcode = req.body.zipcode
	if(!zipcode){
		res.status(400).send("empty")
	}
	else{
		Profile.findOneAndUpdate({username},{zipcode},{new:true,upsert:true},(error,doc)=>{
			if(error){
				res.status(400).send({error:error})
			}
			else{
				if(doc){
					res.status(200).send({username, zipcode:doc.zipcode})
				}
				else{
					res.status(404).send({result:'Did not found headline!'})
				}
			}
		})
	}
}


const getAvatar = (req, res) => {
	const users = req.params.user ? req.params.user.split(','): req.username;
	console.log(users)
	Profile.findOne({username:users}).exec((error,doc)=>{
		if(error){
			res.status(400).send({error:error})
		}
		else{
			if(doc){
				
				res.status(200).send({avatars:[{ username:doc.username, avatar:doc.avatar}]}
				)
			}
			else{
				console.log(users)
				res.status(404).send({result:'No matched  items!'})
			}
		}
		})
}


const putAvatar = (req, res) => {
	const username = req.username
	const avatar = req.fileurl
	console.log('put avatar  here')
	console.log(req.fileurl)
	console.log(username)
	if(!avatar){
		res.status(400).send("empty")
	}
	else{
		Profile.findOneAndUpdate({username},{avatar},{new:true,upsert:true},(error,doc)=>{
			if(error){
				res.status(400).send({error:error})
			}
			else{
				if(doc){
					res.status(200).send({username, avatar:doc.avatar})
				}
				else{
					res.status(404).send({result:'Did not found headline!'})
				}
			}
		})
	}
}

const putAvatar_stub = (req, res) => {
	const username = req.username
	const avatar = req.body
	console.log('put avatar fired')
	if(!avatar){
		res.status(400).send("empty")
	}
	else{console.log('good logic')
		res.status(200).send({username,avatar:'http://content.sportslogos.net/logos/33/813/full/7939_rice_owls-alternate-2010.png'})
	}
}

const getDob = (req, res) => {
	const username = req.params.user ? req.params.user: req.username
	const dob = username===defaultProfile.username ? defaultProfile.dob: new Date("1989-04-16")
	res.status(200).send({username,dob})
}
const uploadAvatar=(req,res)=>{
	res.status(200).send({username:req.username,avatar:req.fileurl})
	console.log(req.fileurl)
}
const uploadImage = require('./uploadCloudinary')
//     app.put('/avatar', uploadImage('avatar'), uploadAvatar)
module.exports = app => {
	app.use(bodyParser.json())
	app.use(cookieParser())	
    app.get('/headlines/:user?',getHeadLines)
    app.put('/headline',putHeadLines)

    app.get('/email/:user?',getEmail)
    app.put('/email',putEmail)

    app.get('/zipcode/:user?',getZipcode)
    app.put('/zipcode',putZipcode)
    
    app.get('/avatars/:user?',getAvatar)
    app.put('/avatar', uploadImage('avatar'), putAvatar)
	//app.put('/avatar',putAvatar_stub)
    app.get('/dob', getDob)
}