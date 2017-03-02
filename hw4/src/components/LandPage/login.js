import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateText,userlogin } from '../../actions'
const LogIn = ({logIn}) => {
	let accountName,password;

	return(
	<div className="col-sm-6 well">
		<div className = "text-center">
			<h2>Login</h2>
		</div>
		<form  onSubmit= {(e) => {
			e.preventDefault();
			logIn(accountName.value);
		}}>
		<div className="form-group row">
			<label htmlFor="example-text-input" className="col-xs-4 col-form-label">User Name</label>
			<div className="col-xs-8">
				<input className="form-control" type="text" name="account name" ref={(node) => { accountName = node }} required/>
			</div>
		</div>
		<div className="form-group row">
			<label  className="col-xs-4 col-form-label">Password</label>
			<div className="col-xs-8">
				<input className="form-control" type="password" name="password" placeholder="Password" id="password" ref={(node) => { password = node }} required/>
			</div>
		</div>
		<input type="hidden" name="timestamp" id="timestamp"/>
		<div className = "col-xs-8 col-md-offset-4">
			<input type="submit" className="btn btn-primary" value="Submit"/>
			<input type="button" className="btn btn-primary" value="Clear" onClick={()=>{
				accountName.value=''
				password.value=''
			}}/>
		</div>
		</form>
		</div>
		)}

	export default connect(null,
    (dispatch) => {
        return {
            logIn:  (name)     => dispatch(userlogin(name))  
        }
    }
    )(LogIn)