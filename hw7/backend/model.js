// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var userSchema = new mongoose.Schema({
	username:String, salt:String, hash:String
})

var user = mongoose.model('user', userSchema)
exports.User = user

var commentSchema = new mongoose.Schema({
	commentId:Number,author: String, date: Date, text: String
})

var articleSchema = new mongoose.Schema({
	id: Number, author: String, img: String, date: Date, text: String,
	comments: [ commentSchema ]
})
var profileSchema = new mongoose.Schema({
	username:String, email: String, zipcode: String, dob: Date, headline: String, 
	avatar:String, following: [String]
})
var profile = mongoose.model('profile', profileSchema)
exports.Profile = profile
exports.Article = mongoose.model('article', articleSchema)
