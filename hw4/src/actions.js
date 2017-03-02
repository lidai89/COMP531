export const UPDATE_TEXT = 'UPDATE_TEXT'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const ERROR = 'ERROR'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const NAV2PROF = 'NAV2PROF'
export const NAV2MAIN = 'NAV2MAIN'
export const ADD_ARTICLE= 'ADDARTICLE'
export const REGISTER='REGISTER'
export const UNFOLLOW='UNFOLLOW'


export const userlogin = (name,password) => {
if(name=='guest'&&password=='visitor')
return{type:LOGIN,account:name,pw:password}
else return{type:ERROR,message:'Invalid Account or Password! Hint:guest, visitor'}
}

export const userlogout = () => {
return{type:LOGOUT
    }
}
export const Nav2Prof = () => {
return{type:NAV2PROF}
}
export const Nav2Main = () => {
return{type:NAV2MAIN}
}

export const addarticle = (input)=>{return{
    type: ADD_ARTICLE,
    author:input.author,
    time:input.time,
    title:input.title,
    text:input.article
    }
}
export const register=(account)=>{
    return{
        type:REGISTER,
        account:account
    }
}

export const unfollow=(id)=>{
    return{
        type:UNFOLLOW,
        id:id
    }
}
export const updateHeadline=(hl)=>{
    return{
        type:UPDATE_TEXT,
        text:hl 
    }
}
export const updateprofile=(input)=>{
    return{
        type:UPDATE_PROFILE,
        message:'Update Succeess!',
        newprofile:{
        username:input.username,
        email:input.email,
        zipcode:input.zipcode,
        avatar:input.avatar,
        password:input.password,
        dob:input.dob
        }
    }
}