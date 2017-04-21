var redis = require('redis').createClient('redis://h:pd28c40df2edc3ba181341c8414d1c865f9a2f2ce8bbbcbdedf87fafa77f102ce@ec2-34-204-242-91.compute-1.amazonaws.com:20629')
const bodyParser = require('body-parser')
var Article = require('./model.js').Article
var cookieParser = require('cookie-parser')
const uploadImage = require('./src/uploadCloudinary')
    
const addArticle = (req, res) => {
    let sid = req.cookies['sid']
    console.log(req.cookies) 
    console.log(sid) 
    console.log(req.fileurl)
        redis.hgetall(sid, function(err,userObject){
            if(userObject && userObject.username){
            req.username = userObject.username;}})
     
     new Article({author: req.username,img:req.fileurl,date:new Date(), text:req.body.text, comments:[]})
     .save((error,doc)=>{
         if(error){
             res.status(400).send({error:error})
         }
         else{
             res.status(200).send({"articles":[doc]})
         }
     })
     
}


const getArticle = (req, res) =>{
    if(req.params.id){
  //  console.log(req.params.id)
	const users = req.params.id;
	Article.find({author:{$in:users}}).exec((error, doc)=>{
       // console.log(doc)
		if(error){
			res.status(400).send({error:err})
		}
		else{
			
				res.status(200).send({ articles: doc})
			
		}
	})
        }
        else{
            Article.find().exec((error,doc)=>
            res.send({articles:doc}));
        }
}
const putArticle = (req,res)=>{
    let p_id=req.params.id;
    let commentId=req.body.commentId;
    //let newarticles=articles.filter((item)=>{return item.id!=p_id})
   // let selectedarticles=articles.filter((item)=>{return item.id==p_id})[0]
    let sid = req.cookies['sid']

        redis.hgetall(sid, function(err,userObject){
            if(userObject && userObject.username){
            req.username = userObject.username;}})
    //console.log(req.headers)
    console.log(req.cookies)
    console.log('username:'+req.username)
    if(req.method=="OPTIONS")return
    if(req.body.commentId&&req.body.commentId>-1){
        
        Article.findByIdAndUpdate({_id:p_id, "comments._id":commentId},
				{$set:{"comments.$.text": req.body.text, "comments.$.date": new Date().getTime()}},
				{new:true},
				(error,doc)=>{
				if(error){
					res.status(400).send({error:error})
				}
				else{
						res.status(200).send({articles:doc})
                }
			})
    }
    if(req.body.commentId&&req.body.commentId==-1){
        
        let sid = req.headers.cookie['sid']

        redis.hgetall(sid, function(err,userObject){
            if(userObject && userObject.username){
            req.username = userObject.username;}})
            console.log(req.username)
         Article.findByIdAndUpdate({_id:p_id, "comments._id":commentId},
				{$push:{comments:{author: req.username, date: new Date().getTime(), text:req.body.text}}},
				{new:true},
				(error,doc)=>{
				if(error){
					res.status(400).send({error:error})
				}
				else{
						res.status(200).send({articles:doc})
                }
			})
    }
    else{
         Article.findByIdAndUpdate({_id:p_id},
                {text:req.body.text},
				{new:true},
				(error,doc)=>{
				if(error){
					res.status(400).send({error:error})
				}
				else{
						res.status(200).send({articles:doc})
                }
			})
    }
}
const defaultmsg=(req,res)=>{
    res.send("Hello dl37!")
}
module.exports= app =>{
app.use(bodyParser.json())
app.use(cookieParser())	
app.get('/',defaultmsg)
app.post('/article',uploadImage('articles'), addArticle)
app.get('/articles/:id?', getArticle)
app.put('/articles/:id',putArticle)}


// Get the port from the environment, i.e., Heroku sets it



