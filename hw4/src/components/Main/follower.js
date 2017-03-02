import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {Follower} from './follow'
import {unfollow} from '../../actions'
//React component for follower side bar



class Following extends Component {
	render(){
		return(
		<div className="well">
		
			{Object.keys(this.props.followers).sort().map((username) => this.props.followers[username]).map((follower)=> 
                <Follower key = {follower.name} name = {follower.name} avatar = {follower.img} headline = {follower.headline} id={follower.id} cancelfollow={this.props.cancelfollow}/>)}
		
			<div className="form-group row">
				<br/>
				<input className="form-control" type="text" placeholder="Friend" id="login_account_name"/>
				<br/>
				<button className="btn btn-primary">Add Friend</button>
				<br/>
			</div>
		</div>
	)}
}


export default connect((state)=>{
	return {
		followers: state.followerlist
            }},
    (dispatch) => ({
	cancelfollow: (input) => {dispatch(unfollow(input))}
}))(Following)
