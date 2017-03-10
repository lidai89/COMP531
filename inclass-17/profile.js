var headlinelist={headlines:[{
         username:'dl37',
         headline:'My Headline!'
     },
     {
         username:'test',
         headline:'Your Headline!'
     }]}

var emaillist=[{
         username:'dl37',
         email:'dl37@rice.edu'
     },
     {
         username:'test',
         email:'test@rice.edu'
     }]
var zipcodelist=[
    {username:'dl37',
         zipcode:'77005'
     },
     {
         username:'test',
         zipcode:'77002'
     }
]

var avatarlist={avatars:[
    {username:'dl37',
         avatar:'http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/A-G/cheetah-running.jpg'
     },
     {
         username:'test',
         avatar:'http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/A-G/cheetah-watching.jpg.adapt.945.1.jpg'
     }
    ]}

const index = (req, res) => {
     res.send({ hello: 'world' })
}
const headlines= (req,res) =>{
    if(!req.params.user)
     {res.send(headlinelist);
         //console.log(req.params)
        }
    else {
        res.send({headlines:[{username:req.params.user,
        headline:headlinelist.headlines.filter((item)=>item.username==req.params.user)}]})
        
    }
}

const addheadline= (req,res)=>{
    headlinelist={headlines:[...headlinelist.headlines,
    {username:'guest',
    headline:req.body.headline}]}
    res.send({username:'guest',
    headline:req.body.headline})
}

const getemail=(req,res) =>{
    if(!req.params.user)
     {res.send(emaillist[0]);
         //console.log(req.params)
        }
    else if(!emaillist.filter((item)=>item.username==req.params.user)[0]) {
        res.send({username:req.params.user,
        email:emaillist[0].email})
        
    }
    else {
        res.send({username:req.params.user,
        email:emaillist.filter((item)=>item.username==req.params.user)[0].email})
        
    }
}

const addemail= (req,res)=>{
    emaillist=[...emaillist,
    {username:'guest',
    email:req.body.email}]
    res.send({username:'guest',
    email:req.body.email})
}

const getzipcode=(req,res) =>{
    if(!req.params.user)
     {res.send(zipcodelist[0]);
         //console.log(req.params)
        }
    else if(!zipcodelist.filter((item)=>item.username==req.params.user)[0]) {
        res.send({username:req.params.user,
        zipcode:zipcodelist[0].zipcode})
        
    }
    else {
        res.send({username:req.params.user,
        zipcode:zipcodelist.filter((item)=>item.username==req.params.user)[0].zipcode})
        
    }
}

const addzipcode= (req,res)=>{
    zipcodelist=[...zipcodelist,
    {username:'guest',
    zipcode:req.body.zipcode}]
    res.send({username:'guest',
    zipcode:req.body.zipcode})
}

const getavatar= (req,res) =>{
    if(!req.params.user)
     {res.send(avatarlist);
         //console.log(req.params)
        }
    else if(!avatarlist.avatars.filter((item)=>item.username==req.params.user)[0]) {
        res.send({avatars:[{username:req.params.user,
        avatar:avatarlist.avatars[0].avatar}]})
        
    }
    else {
        res.send({avatars:[{username:req.params.user,
        avatar:avatarlist.avatars.filter((item)=>item.username==req.params.user)}]})
        
    }
}

const addavatar= (req,res)=>{
    avatarlist={avatar:[...avatarlist.avatars,
    {username:'guest',
    avatar:req.body.avatar}]}
    res.send({username:'guest',
    avatar:req.body.avatar})
}
module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?',headlines)
     app.put('/headline',addheadline)
     app.get('/email/:user?',getemail)
     app.put('/email',addemail)
     app.get('/zipcode/:user?',getzipcode)
     app.put('/zipcode',addzipcode)
     app.get('/avatars/:user?',getavatar)
     app.put('/avatar',addavatar)
}
