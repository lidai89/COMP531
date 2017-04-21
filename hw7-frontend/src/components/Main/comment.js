import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as ReactBootstrap from 'react-bootstrap'
import {updateComment} from '../../actions'
var ContentEditable = require("react-contenteditable");
class Comments extends Component{
    constructor(props){
		super(props);
		this.show = true;
        this.updatecomment='';
        this.newcomment='';
	}
 render() {return(
    <div>
    
    <button type="button" className="btn btn-success btn-sm" onClick={()=>{this.show=!this.show;this.forceUpdate()}}>{this.show?'Show Comment':'Hide Comment'}</button>
    <div className="panel-footer" style={{display:this.show?'none':'block'}}>
    <div className="list-group">
    {this.props.commentlist.map((comment)=>
        <div className="list-group-item" key={comment.commentId}>
        {comment.author} said: 
        {comment.author==this.props.superauthor?<ContentEditable html={comment.text}  onChange={e=>{this.updatecomment=e.target.value}}/>:<p>{comment.text}</p>}
         on {comment.date}
        <button className="btn btn-warning btn-sm" style={{display:comment.author==this.props.superauthor?'block':'none'}}>Edit Comment</button>
        <button className="btn btn-success btn-sm" style={{display:comment.author==this.props.superauthor?'block':'none'}} onClick={e=>{this.props.updatecomment(this.updatecomment,comment.commentId,this.props.articleId)}}>Confirm</button>
        </div>
    )
    }
    </div>
     <textarea className="form-control"  rows="2" cols="20"  placeholder='Comment' ref={(node)=>{this.newcomment=node}}></textarea>
     <button type="button" className="btn btn-primary btn-sm pull-right" onClick={e=>{console.log('new comment: '+this.newcomment.value);this.props.updatecomment(this.newcomment.value,-1,this.props.articleId)}}>Post</button>
    </div>
    </div>
)
}
}

export default connect(null,
(dispatch)=>({
    updatecomment:(input,id,a_id)=>{dispatch(updateComment(input,id,a_id))}
})

)(Comments)