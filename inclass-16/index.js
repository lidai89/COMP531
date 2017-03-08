
const express = require('express')
const bodyParser = require('body-parser')

const addArticle = (req, res) => {
     console.log('Payload received', req.body)    
     res.send(req.body)
     articles=[...articles,
     req.body]
}

const hello = (req, res) => res.send({ hello: 'world' })
const getArticle = (req, res) =>{
res.send({articles:articles})
}
const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
     
})


var articles =[{
    id:1,
    author:"Scott",
    text:"This is my first article"
    },
    {
    id:2,
    author:"Karl",
    text:"This is Karl's article"
    },
    {
    id:3,
    author:"Robert",
    text:"This is Robert's article"
    }
    ]