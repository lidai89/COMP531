var Profile = require('../model.js').Profile


const getFollower = (req, res) => {
	const username = req.params.user ? req.params.user: req.username
	Profile.findOne({username}, 'following').exec((error, doc)=>{
		if(error){
			res.status(400).send({error:error})
		}
		else{
				console.log(doc)
				res.status(200).send({username:doc.username, following:doc.following})
			
		}
	})
}


const putFollower = (req, res) => {
	const addedUser = req.params.user
	const username = req.username
	if(!addedUser){
		res.status(400).send({result:"Invalid input!"});
		return;
	}
	Profile.findOne({username:addedUser}).exec((err, queryItem)=>{
		if(err){
			res.status(400).send({error:err})
		}
		else{
			if(queryItem && queryItem.username !== username){//The added user exits in db

				Profile.findOneAndUpdate({username}, {$addToSet:{following:addedUser}}, {new:true}).exec((err, item)=>{
					if(err){
						res.status(400).send({error:err})
					}
					else{
						if(item){
							res.status(200).send({username, following:item.following})
						}
						else{
							res.status(404).send({result:'No matched items!'})
						}
					}
				})
			}
			else{//The added user does not exit in db
				Profile.findOne({username}, 'following').exec((err, item)=>{
					if(err){
						res.status(400).send({error:err})
					}
					else{
						if(item){
							res.status(200).send({username, following:item.following})
						}
						else{
							res.status(404).send({result:'No matched items!'})
						}
					}
				})	
			}
		}
	})
}


const deleteFollower = (req, res) => {
	const delUser = req.params.user
	const username = req.username
	if(!delUser){
		res.status(400).send({result:"Invalid input!"});
		return;
	}
	Profile.findOneAndUpdate({username}, {$pull:{following:delUser}}, {new:true}).exec((err, item)=>{
		if(err){
			res.status(400).send({error:err})
		}
		else{
			if(item){
				res.status(200).send({username, following:item.following})
			}
			else{
				res.status(404).send({result:'No matched items!'})
			}
		}
	})
}


module.exports = app => {
    app.get('/following/:user?', getFollower)
    app.put('/following/:user', putFollower)
    app.delete('/following/:user', deleteFollower)
}