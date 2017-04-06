
const bodyParser = require('body-parser')
let id=5;
const addArticle = (req, res) => {
     console.log('Payload received', req.body) 
     var newarticle= {id:articles.length+1, author: req.body.author,date:req.body.date, text:req.body.text, comments:[]}
     articles=[...articles,
     newarticle]
     res.send(newarticle)
}


const getArticle = (req, res) =>{
    if(req.params.id){
            console.log(articles)
            let target = articles.filter((item)=>{return item.id == req.params.id })
            console.log(articles.filter((item)=>{return item.id == req.params.id }))
            console.log(target)
            console.log(req.params.id)
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
const putArticle = (req,res)=>{
    let p_id=req.params.id;
    let newarticles=articles.filter((item)=>{return item.id!=p_id})
    let selectedarticles=articles.filter((item)=>{return item.id==p_id})[0]
    
    if(req.body.commentId&&req.body.commentId>-1){
        
        let unselectedcomment=selectedarticles.comments.filter((item)=>{return item.commentId!=req.body.commentId})
        res.send({articles:
                [...newarticles,
                    {selectedarticles,comments:
                        [...unselectedarticles.comments,
                            {commentId:req.body.commentId,text:req.body.text,author:'guest'}
                            ]
                        }
                        ]
                    }
                    )
    }
    if(req.body.commentId&&req.body.commentId==-1){
        
        
        res.send({articles:
                [...newarticles,
                    {selectedarticles,comments:
                        [...unselectedarticles.comments,
                            {commentId:1000,text:req.body.text,author:'guest'}
                            ]
                        }
                        ]
                    }
                    )
    }
    else{
        res.send({articles:
            [...newarticles,{selectedarticles,text:req.body.text}]})
    }
}
const defaultmsg=(req,res)=>{
    res.send("Hello dl37!")
}
module.exports= app =>{
app.use(bodyParser.json())
app.get('/',defaultmsg)
app.post('/article', addArticle)
app.get('/articles/:id?', getArticle)}

// Get the port from the environment, i.e., Heroku sets it



var articles =[{
    id:1,
    author:"dl37",
    text:"This is my first article",
    comments:[{author:'dl37test',commendId:1212,date:'2015-10-27T19:52:25.960Z',text:'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex!'}],
    date:'2017-04-04T15:09:04Z',
    img:'http://az616578.vo.msecnd.net/files/2017/02/10/636223537065395516-1597768472_snow%204.jpg'
    },
    {
    id:2,
    author:"dl37",
    text:"This is Karl's article",
    comments:[{author:'dl37test1',commendId:1213,date:'2015-10-17T19:52:25.960Z',text:'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex!'}],
    date:'2011-04-04T15:07:04Z'
    },
    {
    id:3,
    author:"dl37",
    text:"This is Robert's article",
    comments:[{author:'dl37',commendId:1214,date:'2016-10-27T19:52:25.960Z',text:'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex!'}],
    date:'2016-04-04T15:07:04Z',
    img:'https://s-media-cache-ak0.pinimg.com/originals/20/0b/95/200b95dfb2efa80d37479764a324b462.jpg'
    },
    {
    id:4,
    author:"dl37",
    text:"Test article 4",
    comments:[],
    date:'2017-04-03T15:07:04Z',
    img:'http://hpcsonline.org/wp-content/uploads/2016/01/Snow-row.jpg'
    },
    {
    id:5,
    author:"dl37",
    text:"Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis diam. Pellentesque ut neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    comments:[{author:'dl37test',commendId:1215,date:'2015-11-27T19:52:25.960Z',text:'test comment'},
    {author:'dl37',commendId:1216,date:'2015-11-28T19:52:25.960Z',text:'test comment more'}],
    date:'2017-04-04T15:07:04Z',
    img:'http://www.telegraph.co.uk/content/dam/Travel/ski/CourchevelTourisme-DomaineSkiable-36_header-large.jpg'
    }
    ]