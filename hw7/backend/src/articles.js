var Article = require('../model.js').Article

const postArticle = (req, res) => {
    if(!req.body.text){
    	res.status(401).send("Invalid input! No text!");
    	return;
    }
    new Article({author: req.username, img: null, date: new Date().getTime(), text:req.body.text, comments:[]})
    .save((err, doc, num)=>{
    	if(err){
			res.status(400).send({error:err})
    	}
    	if(doc){
    		res.status(200).send({"articles":[doc]})
    	}
    	else{
    		res.status(404).send({result:'No matched items!'})
    	}
    })
}

const getArticles = (req,res) => {
	const id = req.params.id;
	if(id){//View it as article id for now
		Article.findById(id,(err,item)=>{
			if(err){
				res.status(400).send({error:err})
			}
			else{
				if(item){
					res.status(200).send({ articles: [item]})
				}
				else{
					res.status(404).send({result:'No matched items!'})
				}
			}
		})
	}
	else{//No id provided, return all articles in the db.
		Article.find({},(err, items)=>{
			if(err){
				res.status(400).send({error:err})
			}
			else{
				if(items){
					res.status(200).send({ articles: items})
				}
				else{
					res.status(404).send({result:'No matched items!'})
				}
			}
		})
	}
}


//This is just stub for now! Not implemented the schema
const putArticles = (req, res) => {
	const id = req.params.id;
	const commentId = req.body.commentId
	console.log(req.username)
	if(commentId){
		if(commentId===-1){//Add a new comment
			Article.findByIdAndUpdate(id,{$push:{comments:{author: req.username, date: new Date().getTime(), text:req.body.text}}},{new:true},(err,item)=>{
				if(err){
					res.status(400).send({error:err})
				}
				else{
					if(item){
						res.status(200).send({articles:[item]})
					}
					else{
						res.status(404).send({result:'No matched items!'})
					}
				}
			})
		}
		else{//update the comment by commentId
			Article.findOneAndUpdate({_id:id, "comments._id":commentId},
				{$set:{"comments.$.text": req.body.text, "comments.$.date": new Date().getTime()}},
				{new:true},
				(err,item)=>{
				if(err){
					res.status(400).send({error:err})
				}
				else{
					if(item){
						res.status(200).send({articles:[item]})
					}
					else{
						res.status(404).send({result:'No matched items!'})
					}
				}
			})
		}
	}
	else{//Update article
		Article.findByIdAndUpdate(id,{text:req.body.text},{new:true},(err,item)=>{
			if(err){
				res.status(400).send({error:err})
			}
			else{
				if(item){
					res.status(200).send({articles:[item]})
				}
				else{
					res.status(404).send({result:'No matched items!'})
				}
			}
		})
	}
}


module.exports = app => {	
	app.post('/article', postArticle)
	app.get('/articles/:id*?',getArticles)
	app.put('/articles/:id', putArticles)
}