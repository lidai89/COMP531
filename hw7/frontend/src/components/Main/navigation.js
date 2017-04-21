import React from 'react'
import { connect } from 'react-redux'
import { Nav2Prof,userlogout } from '../../actions'

//The navi bar JSX

const Navigation = ({logout,gotoprof}) => (
	<nav role="navigation" id='navbar' className="navbar navbar-default">
        <div className="navbar-header">
            <a href="#" className="navbar-brand">RiceBook Demo Main Page</a>
        </div>
        <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={ ()=> gotoprof()}>Profile</a></li>
                <li><a href="#" onClick={ ()=> logout()}>Logout</a></li>
            </ul>
        </div>
    </nav>
)

export default connect(null,
(dispatch)=>{
    return {
            logout:  ()     => dispatch(userlogout()) , 
            gotoprof: ()    => dispatch(Nav2Prof())
        }
}
)(Navigation)