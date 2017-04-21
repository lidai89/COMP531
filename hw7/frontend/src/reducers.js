import * as Actions from './actions'
const initialItems = require('./data/articlelist.json')
const initialfollower=require('./data/follower.json')
const initialprofile=require('./data/profile.json')
const initialstate= {
    text: 'hello world!',
    articlelist:initialItems.articlelist,
    //followerlist:initialfollower.followerlist,
    followerlist:[],
    location: 'Landing Page',
    message: '',
    regmessage:'',
    keyword:'',
    account: 'guest',
    nextid:8,
    avatar:"http://www.hbc333.com/data/out/180/47265470-picture-cartoon.png",
    headline: "Javascript Test",
    profile:{
        username:initialprofile.myprofile[0].name,
        dob:initialprofile.myprofile[0].dob,
        email:initialprofile.myprofile[0].email,
        zipcode:initialprofile.myprofile[0].zipcode,
        avatar:initialprofile.myprofile[0].img,
        password:initialprofile.myprofile[0].password,
    }
}
const Reducer = (state =initialstate
, action) => {
    switch (action.type) {
        case Actions.UPDATE_TEXT:
            return { ...state, headline: action.text}
        case Actions.UPDATE_PROFILE:
            if(action.newprofile){
                return {...state,
                    profile:action.newprofile}
            }
            if(action.avatar){
            return {...state,
                    avatar:action.avatar,
                    profile:{...state.profile,avatar:action.avatar},message:action.message}}
            if(action.email){
            return {...state,
            profile:{...state.profile,email:action.email},message:action.message}}
            if(action.zipcode){
            return {...state,
            profile:{...state.profile,zipcode:action.zipcode},message:action.message}}
        case Actions.ERROR:
            return { ...state, message: action.message,regmessage:''}
        case Actions.LOGIN:
            return {...state,location:'Main',account:action.account,message:'',avatar:action.avatar,
            profile:{...state.profile,avatar:action.avatar},
            regmessage:''}
        case Actions.ADD_ARTICLE:
        return {...state,
            nextid:state.nextid+1,
            articlelist:[
                ...state.articlelist,
                {author:action.author,
                title:action.title,
                text:action.text,
                date:action.time,
                comments:action.comments,
                _id:state.nextid,
                img:"https://upload.wikimedia.org/wikipedia/en/d/d4/Mickey_Mouse.png"
                    }
            ]
        }
         case Actions.GETARTICLE:
         return{...state,
             articlelist:action.articlelist

         }
         case Actions.FILTERARTICLE:
         return{
             ...state,
             keyword:action.keyword
         }

         case Actions.GETFOLLOWER:
         return {...state,
             message:'',
             followerlist:[...state.followerlist.filter((element,index)=>element.userid!=action.userid),{userid:action.userid,avatar:action.avatar,headline:action.headline}]

         }
         case Actions.LOGOUT:
         return {
                ...initialstate,location:'Landing Page',message:''
         }   

         case Actions.NAV2PROF:
         return{
             ...state,location:'Profile',message:''
         }
         case Actions.NAV2MAIN:
         return{
             ...state,location:'Main',message:''
         }
            
            
        case Actions.REGISTER:
        return{
            ...state,
            regmessage:action.regmessage
        }
        case Actions.UNFOLLOW:
        return{
            ...state,
            followerlist:state.followerlist.filter((element,index)=>index!=action.id)
        }
        default:
            return state
    }
}

export default Reducer