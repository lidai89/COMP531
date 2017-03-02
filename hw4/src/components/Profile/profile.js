import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {updateprofile} from '../../actions'
import Navigation2Main from './navagation2main'
//Profile with update function

export const Profile =  ({username,email,zipcode,dob,avatar,message,updateprof})=> {
    let newusername,newzipcode,newemail;
    { return (
        <div>
        <Navigation2Main/>
		{message===''?'':
			<div className="row formRow alert alert-success"> {message} </div>
		}
        <div className="jumbotron text-center">
        <form className="centerForm" onSubmit={(e) => {
           updateprof({
               username:newusername.value==''?username:newusername.value,
               email:newemail.value==''?email:newemail.value,
               zipcode:newzipcode.value==''?zipcode:newzipcode.value,
               dob:dob,
               avatar:avatar
                });
        }}>
        	<div className="row property" id="displayName">
				<div className="col-md-4">Display Name:</div>
                <div className="col-md-4"><input type="text" size="20" ref={(node) => {newusername=node}}/></div>
				<div className="col-md-4">{username}</div>
			</div>
			<div className="row property">
				<div className="col-md-4">Date of Birth:</div>
				<div className="col-md-4">{dob}</div>
				<div className="col-md-4">(Cannot update!)</div>
			</div>
			<div className="row property" id="emailAddress">
				<div className="col-md-4">Email Address:</div>
				<div className="col-md-4"><input type="text" type="email" placeholder="eg. a@b.co" size="20" ref={(node) => {newemail=node}}/></div>
				<div className="col-md-4">{email}</div>
			</div>
			<div className="row property" id="zipcode">
				<div className="col-md-4">Zipcode:</div>
				<div className="col-md-4"><input type="text" size="20" pattern="^\d{5}(?:[-\s]\d{4})?$" ref={(node) => {newzipcode=node}}/></div>
				<div className="col-md-4">{zipcode}</div>
			</div>
			<div className="row property" id="password">
				<div className="col-md-4">Password:</div>
				<div className="col-md-4"><input type="password" size="20"/></div>
				<div className="col-md-4"></div>
			</div>
			<div className="row property">
				<div className="col-md-4">Password Confirmation:</div>
				<div className="col-md-4"><input type="password" size="20" id="passwordConfirm"/></div>
				<div className="col-md-4"></div>
			</div>
			<div className="row">
			<img src={avatar} style={{height:'100px'}}/>
		    </div>
			<div className="row formRow text-center">
				<input type="submit" className="btn btn-primary" value="Update"/>
			</div>
            <label className="btn btn-default btn-file">Upload Image<input type="file" style={{display: 'none'}}/></label>
        </form>
        
        </div>
        </div>
    )}
}



export default connect((state) => {
	return {
		username: state.profile.username,
		avatar: state.profile.avatar,
		zipcode: state.profile.zipcode,
		email: state.profile.email,
		dob: state.profile.dob,
		message:state.message
	}},
    (dispatch) => ({
	updateprof: (input) => {dispatch(updateprofile(input))}})
    )(Profile)

