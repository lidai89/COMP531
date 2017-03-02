import * as Actions from './actions'
const initialItems = require('./data/articlelist.json')
const initialfollower=require('./data/follower.json')
const initialprofile=require('./data/profile.json')

const Reducer = (state = {
    text: 'hello world!',
    articlelist:initialItems.articlelist,
    followerlist:initialfollower.followerlist,
    location: 'Landing Page',
    message: '',
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
}, action) => {
    switch (action.type) {
        case Actions.UPDATE_TEXT:
            return { ...state, headline: action.text}
        case Actions.UPDATE_PROFILE:
            return {...state,
                profile:action.newprofile,message:action.message}
        case Actions.ERROR:
            return { ...state, message: action.message }
        case Actions.LOGIN:
            return {...state,location:'Main',account:action.account,message:''}
        case Actions.ERROR:
            return {...state,message:action.message}
        case Actions.ADD_ARTICLE:
        return {...state,
            nextid:state.nextid+1,
            articlelist:[
                ...state.articlelist,
                {author:action.author,
                title:action.title,
                text:action.text,
                date:action.time,
                id:state.nextid,
                img:"https://upload.wikimedia.org/wikipedia/en/d/d4/Mickey_Mouse.png"
                    }
            ]
        }
         case Actions.LOGOUT:
         return {
                ...state,location:'Landing Page',message:''
         }   

         case Actions.NAV2PROF:
         return{
             ...state,location:'Profile'
         }
         case Actions.NAV2MAIN:
         return{
             ...state,location:'Main',message:''
         }
            
            
        case Actions.REGISTER:
        return{
            ...state,
            location:'Main',
            account:action.account.value
        }
        case Actions.UNFOLLOW:
        return{
            ...state,
            followerlist:state.followerlist.filter((item)=>item.id!=action.id)
        }
        default:
            return state
    }
}

export default Reducer