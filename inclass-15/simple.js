const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

const articles = { articles: [ 
          { id:1, author: 'Scott', body:'A post' },
          { id:2, author: 'Pollack', body:'Another post' },
          { id:3, author: 'COMP 531', body:'New post' }
     ]}

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     //const payload = { 'hello': 'world' }
     var payload={};
     switch(req.method){
         case 'GET':
         {payload=(req.url=='/articles')?articles:{'hello': 'world'}}
         case 'POST':
         {if(req.url=='/login')
                    {var reqJson = JSON.parse(req.body)
                    payload.username = reqJson.username
                    payload.result = 'success'}}
         case 'PUT':
         {if(req.url=='/logout'){
             payload='OK';
         }
        }
     }
     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}