//follower stubs

const getFollowing = (req, res) => {
	const user = req.params.user ? re.params.user: 'dl37'
	//return followers for dl37
    res.status(200).send({ 
    	username:user,
     	following:['sep1','dl37test'] 
     })

}


const putFollowing = (req, res) => {
	const user = req.params.user

	if(!user){
		res.status(400).send({result:"Invalid input!"});
		return;
	}

	res.status(200).send({ 
		username:'dl37',
     	following:['sep1','dl37test',user]
    })

}


const deleteFollowing = (req, res) => {

	if(!user){
		res.status(400).send({result:"Invalid input!"});
		return;
	}

	res.status(200).send({ 
		username:'dl37',
     	following:[]
    })

}


module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}