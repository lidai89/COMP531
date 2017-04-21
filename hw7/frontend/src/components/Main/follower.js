import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {Follower} from './follow'
import {unfollow} from '../../actions'
import {addfollower} from '../../actions'
//React component for follower side bar



class Following extends Component {
	constructor(props){
		super(props);
		this.addfriend = '';
	}
	render(){
		return(
		<div className="well">
		
			{Object.keys(this.props.followers).map((id) => this.props.followers[id]).map((follower,index)=> 
				<Follower key = {index} id={index} account={this.props.account} name = {follower.userid?follower.userid:'follower'} avatar = {follower.avatar?follower.avatar:''} headline = {follower.headline?follower.headline:''}  cancelfollow={this.props.cancelfollow}/>)}
		
			<div className="form-group row">
				<br/>
				<input className="form-control" type="text" placeholder="Friend" id="login_account_name" ref={(node) => { this.addfriend = node }}/>
				<br/>
				<button className="btn btn-primary btn-sm" onClick={()=>this.props.addfollow(this.addfriend.value,this.props.account)}>Add Friend</button>
				<br/>
			</div>
		</div>
	)}
}


export default connect((state)=>{
	return {
		followers: state.followerlist,
		account:state.account
            }},
    (dispatch) => ({
	cancelfollow: (input) => {dispatch(unfollow(input))},
	addfollow:(input,account)=>{dispatch(addfollower(input,account))}
}))(Following)
