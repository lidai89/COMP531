
const express = require('express')

const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", req.headers.origin)
	res.header("Access-Control-Allow-Credentials", true)
	res.header("Access-Control-Allow-Methods", 'GET, DELETE, POST, PUT')
	res.header("Access-Control-Allow-Headers", 'Authorization, Content-Type, Origin, X-Requested-With, X-Session-Id')
	res.header("Access-Control-Expose-Headers", 'Location, X-Session-Id')
	if(req.method === 'OPTIONS'){
		console.log('received options')
		res.sendStatus(200)
		return
		//next()
	}
	else{
		//console.log(req.body)
		//console.log('endpoint  '+req.endpoint)
		next()
	}
})     


require('./src/auth')(app)
require('./src/following')(app)
require('./src/profile')(app)
require('./dbpost')(app)
require('./articles')(app)
// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
     
})

