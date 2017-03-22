
const bodyParser = require('body-parser')

const addArticle = (req, res) => {
     console.log('Payload received', req.body) 
     newarticle= {id:articles.length+1, author: req.body.author, text:req.body.text}
     articles=[...articles,
     newarticle]
     res.send(newarticle)
}


const getArticle = (req, res) =>{
    if(req.params.id){
            
            let target = articles.filter((item)=>{return item.id == req.params.id })
            if(target.length!==0){
                res.send({articles:target});
            }
            else{
                res.send({articles:[]})
            }
        }
        else{
            res.send({articles:articles});
        }
}
module.exports= app =>{
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/articles/:id?', getArticle)}

// Get the port from the environment, i.e., Heroku sets it



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