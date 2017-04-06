//Stub the functionality for now.

const login= (req,res)=>{
	const username = req.body.username;
	const password = req.body.password;
	if(username!='dl37' || password!='needs-poetry-cake'){
		res.status(400).send({result:"Invalid input!"});
		return;
	}
	//currently support dl37 only
	res.status(200).send({
		username:username, 
		result:'success'
	});
	
}

const logout= (req, res)=>{
	res.status(200).send('OK');

}

const register= (req, res)=>{
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;
	const dob = req.body.dob;
	const zipcode = req.body.zipcode;
	if(!username || !password || !email || !dob || !zipcode){
		res.status(400).send({result:"Invalid input!"});
		return;
	}

	res.status(200).send({
		username:username, 
		result:'success'
	});

}

const ChangePassword = (req, res)=>{
	const password = req.body.password;
	if(!password){
		res.status(400).send({result:"Invalid input!"});
	}
	//not supported functionality
	res.status(200).send({
		username:'dl37', 
		status:'Do not support password change for now'
	});

}

module.exports = app => {
    app.post('/login', login)
    app.put('/logout', logout)
    app.post('/register', register)
    app.put('/password',ChangePassword)
}