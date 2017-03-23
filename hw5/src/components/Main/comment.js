import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as ReactBootstrap from 'react-bootstrap'
class Comments extends Component{
    constructor(props){
		super(props);
		this.show = true;
	}
 render() {return(
    <div>
    <button type="button" className="btn btn-primary btn-sm">Edit</button>
    <button type="button" className="btn btn-success btn-sm" onClick={()=>{this.show=!this.show;this.forceUpdate()}}>{this.show?'Show Comment':'Hide Comment'}</button>
    <div className="panel-footer" style={{display:this.show?'none':'block'}}>
    <div className="list-group">
    {this.props.commentlist.map((comment)=>
        <div className="list-group-item" key={comment.commentId}>
        {comment.author} said: {comment.text} on {comment.date}
        </div>
    )
    }
    </div>
     <textarea className="form-control"  rows="2" cols="20"  placeholder='Comment'></textarea>
     <button type="button" className="btn btn-primary btn-sm pull-right">Post</button>
    </div>
    </div>
)
}
}

export default connect(

)(Comments)