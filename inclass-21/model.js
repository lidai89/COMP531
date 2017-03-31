// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var userSchema = new mongoose.Schema({
	username:String, salt:String, hash:String
})
var postSchema = new mongoose.Schema({
	id: Number, author: String, img: String, date: Date, body: String,
	comments: [ commentSchema ]
})

exports.Post = mongoose.model('post', postSchema)
exports.User = mongoose.model('user', userSchema)