import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import {updateHeadline} from '../../actions'

const Headline = ({avatar, headline,account, updateheadline}) => {
	let newHeadline;
	return(<div className="well">
		<div className="row">
            <h1>{account}</h1>
			<img className="img-thumbnail" src={avatar} style={{height:'100px'}}/>
		</div>
		<div className="row">
			<br/>
			<div className="jumbotron text-center">
            <div className="container"><b>Headline</b></div></div>
			<p>{headline}</p>
			<input type="text" className="form-control input-sm" style={{maxlength:"64px"}} placeholder="Update Status" ref={(node) => {newHeadline=node}}/>
			<br/>
			<button type="button" className="btn btn-primary" onClick={()=>updateheadline(newHeadline.value)}>Update</button>
		</div>
	</div>)}

//update headline
export default connect((state) => ({
		avatar: state.avatar,
		headline: state.headline,
        account:state.account
}),
    (dispatch) => ({
	updateheadline:(newheadline)=>dispatch(updateHeadline(newheadline))
        })
)(Headline)