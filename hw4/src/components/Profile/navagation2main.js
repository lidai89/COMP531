import React from 'react'
import { connect } from 'react-redux'
import { Nav2Main,userlogout } from '../../actions'

//The navi bar JSX

export const Navigation2Main = ({logout,gotomain}) => (
	<nav role="navigation" className="navbar navbar-default">
        <div className="navbar-header">
            <a href="#" className="navbar-brand">RiceBook Demo Profile</a>
        </div>
        <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={ ()=> gotomain()}>Main</a></li>
                <li><a href="#" onClick={ ()=> logout()}>Logout</a></li>
            </ul>
        </div>
    </nav>
)

export default connect(null,
(dispatch)=>{
    return {
            logout:  ()     => dispatch(userlogout()) , 
            gotomain: ()    => dispatch(Nav2Main())
        }
}
)(Navigation2Main)