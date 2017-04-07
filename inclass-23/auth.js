

//facebook passport
const callbackURL = 'http://localhost:3000/auth/callback'
const config = {
	clientSecret:'e080de3f85d19f51c70781e24fd38d86', 
	clientID:'403256360055936', 
	callbackURL
}

var users = [];
var request = require('request')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done){
	users[user.id] = user
	done(null, user.id)
})

passport.deserializeUser(function(id,done){
	var user = users[id]
	done(null,user)
})

passport.use(new FacebookStrategy(config,
	function(token, refreshToken, profile, done){
		process.nextTick(function(){
			return done(null,profile);
		})
	}
))




module.exports = app => {
    app.use(session({secret:'what a secret'}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use(cookieParser())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/', failureRedirect:'/fail'}))
}









