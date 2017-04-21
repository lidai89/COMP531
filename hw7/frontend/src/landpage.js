import React, {Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateText,userlogin } from './actions'
import * as ReactBootstrap from 'react-bootstrap'
import Register from './components/LandPage/register'
import LogIn from './components/LandPage/login'


export const Landpage = ({ text, message,regmessage,update,login }) => {
    let input;

    const _update = () => {
        if (input && input.value) {
            update(input.value)
            input.value = ''
        }
    }
        return (<div>
        <ReactBootstrap.Jumbotron id='welcome' bsClass='jumbotron text-center'>
        <h1>RiceBook</h1>
        <h1>{text}</h1>
        <p>This is a draft frontend of RiceBook App</p>
        </ReactBootstrap.Jumbotron>
        {message===''?'':
        <div className="row formRow alert alert-danger text-center"> {message} </div>}
        {regmessage===''?'':
        <div className="row formRow alert alert-success text-center"> {regmessage} </div>}
        <div className="row" id='welcomerow'>
        <Register/>
        <LogIn/>
        </div>
        </div>)
}
Landpage.propTypes = {
    text: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
}

export default connect(
    (state)=>({text:state.text,message:state.message,regmessage:state.regmessage}),
    (dispatch) => {
        return{ update: (text) => dispatch(updateText(text)),
               // login:  ()     => dispatch(userlogin()) 
            }
            }
                     
)(Landpage)
