import React from 'react'
import thunkMiddleware from 'redux-thunk'
import fetch from 'isomorphic-fetch'

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
export const GETARTICLE='GETARTICLE'
export const GETFOLLOWER='GETFOLLOWER'
export const FILTERARTICLE='FILTERARTICLE'
export const ADDFOLLOW='ADDFOLLOW'


// export const userlogin = (name,password) => {
// if(name=='guest'&&password=='visitor')
// return{type:LOGIN,account:name,pw:password}
// else return{type:ERROR,message:'Invalid Account or Password! Hint:guest, visitor'}
// }

export const userlogout = () => {
return (dispatch)=>{
        resource('PUT','logout')
        .then(dispatch({type:LOGOUT,regmessage:'',message:''}))
        .catch(e=>{console.log(e)});
        
        
    }
}
export const Nav2Prof = () => {
return{type:NAV2PROF}
}
export const Nav2Main = () => {
return{type:NAV2MAIN}
}

export const addarticle = (input)=>{
    return (dispatch)=>{
    resource('POST', 'article', { text:input.article })
    .then(r=>resource('GET','articles'))
    .then(function(r){
        const articles=r.articles;
        dispatch({type:GETARTICLE,articlelist:articles})
    })
    .catch(e=>{console.log(e);
    })
    }
}
export const register=(account)=>{
    return (dispatch)=>{
        resource('POST','register',{account})
        .then(dispatch({type:REGISTER,regmessage:'Register Success! But you cannot log in!'}))
        .catch(e=>{console.log(e)});
        
        
    }
}
export const reporterror=(message)=>{
    return{type:ERROR,message:message}
}
export const unfollow=(id,account)=>{
    {
    return (dispatch)=>{
    resource('DELETE', 'following/'+account, { username:account, following:[id] })
    .then(
    dispatch({
        type:UNFOLLOW,
        id:id
    }))
    .catch(e=>{console.log(e);
    })
}
}
}
export const addfollower=(id,account)=>{
    return (dispatch)=>{ resource('PUT', 'following/'+account, { username:'', following:[id] })
    .then(r=>resource('GET', 'avatars/'+id)
        .then(r=>{
            const user = r.avatars[0]
            resource('GET', 'headlines/'+id)
            .then(r=>{
            const headline=r.headlines[0]
            dispatch({type:GETFOLLOWER,userid:id,avatar:user.avatar,headline:headline.headline})})
        .catch(e=>{console.log(e);
        dispatch({type:ERROR,message:'invalid follower'})})}
    ))
    .catch(e=>{console.log(e);
        dispatch({type:ERROR,message:'invalid follower'})})
    }
}
export const updateHeadline=(hl)=>{
   
    return (dispatch)=>{
    resource('PUT', 'headline', { username:'', headline:hl })
    .then(
    dispatch({
        type:UPDATE_TEXT,
        text:hl }))
    .catch(e=>{console.log(e);
    })
    }
    }
    

export const updateprofile=(input,pw)=>{
    if(pw=='')
    {return (dispatch)=>{
        resource('PUT','email',{email:input.email})
        .then(r=>{resource('PUT','zipcode',{zipcode:input.zipcode})})
        .then(dispatch({type:UPDATE_PROFILE,
        message:'Update Success!',
        newprofile:{
        username:input.username,
        email:input.email,
        zipcode:input.zipcode,
        avatar:input.avatar,
        password:input.password,
        dob:input.dob
        }}))
        .catch(e=>{dispatch({
            type:ERROR,message:'Update Failed'
        })})
        }
    }
    else{
        return(dispatch)=>{
        resource('PUT','password',{password:pw})
        .then(dispatch({
            type:ERROR,message:'The Server Do Not Support This Action!'
        }))
    }
    }
}



export const url = 'https://webdev-dummy.herokuapp.com'

export const resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) options.body = JSON.stringify(payload)

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        // useful for debugging, but remove in production
        console.error(`${method} ${endpoint} ${r.statusText}`)
        throw new Error(r.statusText)
      }
    })
}

export const userlogin = (username,password) => {
  let status;
  const box = document.querySelector("#message")
  return (dispatch)=>{ resource('POST', 'login', { username, password })
    .then(r => resource('GET', 'avatars'))
    .then(function(r){
      const user = r.avatars[0]
      status=true;
     dispatch({type:LOGIN,account:username,pw:password,avatar:user.avatar})
    })
    .then(r => resource('GET', 'headlines'))
    .then(function(r){
      const user = r.headlines[0]
      status=true;
     dispatch({type:UPDATE_TEXT,text:user.headline})
     
    })
    .then(r=>resource('GET','articles'))
    .then(function(r){
        const articles=r.articles;
        dispatch({type:GETARTICLE,articlelist:articles})
    })
    .then(r=>resource('GET','following'))
    .then(r =>{
       r.following.forEach(item=>{
         resource('GET', 'avatars/'+item)
        .then(r=>{
            const user = r.avatars[0]
            resource('GET', 'headlines/'+item)
            .then(r=>{
            const headline=r.headlines[0]
            dispatch({type:GETFOLLOWER,userid:item,avatar:user.avatar,headline:headline.headline})})}
        )
    })
    })
    .then(r=>resource('GET','email'))
    .then(r=>{const email=r.email
        resource('GET','zipcode')
        .then(r=>{
            const zipcode=r.zipcode;
            resource('GET','dob')
            .then(r=>{
                const dob=r.dob;
                resource('GET', 'avatars').then(
                r=>{
                    const avatar=r.avatars[0].avatar;
                dispatch({type:UPDATE_PROFILE,newprofile:{email:email,dob:dob,zipcode:zipcode,
                    username:username,password:password,avatar:avatar},message:''})})
            })
        })})
    .catch(r => {
    status=false;
    dispatch({type:ERROR,message:'Login Denied!   Please use username "dl37" and password "needs-poetry-cake"'})})
  }    
}

const updatefolloweravatar= (following)=>{
    return following.forEach(item=>{
       return (dispatch)=>{ resource('GET', 'avatars/'+item)
        .then(r=>{
            const user = r.avatars[0]
            dispatch({type:GETFOLLOWER,userid:item,avatar:user.avatar})})
    }})
}

export const filterarticle= (keyword)=>{
    return {type:FILTERARTICLE,keyword:keyword}
}

export function getProfile(){
	return (dispatch) => {
		return Promise.all([
			getProfileAvatars()(dispatch),
			getProfileEmail()(dispatch),
			getProfileZipcode()(dispatch),
			getProfileDob()(dispatch)
		])
	}
}
function getProfileAvatars(){
	return (dispatch) => {
		return resource('GET','avatars')
		.then((response)=>{
			dispatch({type:UPDATE_PROFILE, avatar: response.avatars[0].avatar});
		})
	}
}

function getProfileEmail(){
	return (dispatch) => {
		return resource('GET','email')
		.then((response)=>{
			dispatch({type:UPDATE_PROFILE, email: response.email});
		})
	}
}

function getProfileZipcode(){
	return (dispatch) => {
		return resource('GET','zipcode')
		.then((response)=>{
			dispatch({type:UPDATE_PROFILE, zipcode: response.zipcode});
		})
	}
}

function getProfileDob(){
	return (dispatch) => {
		return resource('GET','dob')
		.then((response)=>{
			dispatch({type:UPDATE_PROFILE, dob: new Date(response.dob).toDateString()});
		})
	}
}

export function getProfileHeadline(user){
	return (dispatch) => {
		resource('GET',`headlines/${user}`)
		.then((response)=>{
			dispatch({type:UPDATE_PROFILE, headline: response.headlines[0].headline});
		})
	}
}