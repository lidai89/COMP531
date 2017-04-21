import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Comments from './comment'
import * as ReactBootstrap from 'react-bootstrap'
import {updatearticle} from '../../actions'
var ContentEditable = require("react-contenteditable");
class Article extends Component {
	//article session with images, text, author and button
    // {title,imgsrc,text,author,key,time,comment}
    constructor(props){
        super(props);
        this.newtime=new Date(props.time);
        this.articleEdit=false;
        this.newtext='';
    }
    handleChange=e=>{this.newtext=e.target.value}
    render(){return(
   
    <div>
    <ReactBootstrap.Panel header={this.title} width='300'>
    <img className="card-img-top" src={this.props.imgsrc} alt="Card image cap" width='300' style={{display:this.props.imgsrc?'block':'none'}}/>
    <div className="card-block">
        <h4 className="card-title">{this.props.author} said on {this.newtime.toLocaleDateString()} at {this.newtime.toLocaleTimeString()} </h4>
       
        {!this.articleEdit?<p className="card-text"> {this.props.text}</p>:<ContentEditable  onChange={this.handleChange} html={this.props.text}/>}
       
        <p className="card-text">Author: {this.props.author}</p>
        <div className="btn-group">
        <button type="button" className="btn btn-danger btn-sm pull-right" style={{display:this.articleEdit?'block':'none'}} onClick={e=>{this.props.updateArticle(this.props.id,this.newtext);this.articleEdit=!this.articleEdit;}}>Submit</button>
        <button type="button" className="btn btn-primary btn-sm pull-right" style={{display:this.props.author==this.props.superauthor?'block':'none'}} onClick={e=>{this.articleEdit=!this.articleEdit; this.forceUpdate()}}>
        Edit Article</button>
        </div>
        <Comments commentlist={this.props.comment} superauthor={this.props.superauthor} articleId={this.props.id}/>
    </div>
    </ReactBootstrap.Panel>
    </div>
    )}}

	export default connect(null,
    (dispatch)=>({
        updateArticle:(id,input)=>{dispatch(updatearticle(id,input))}
    })
    )(Article)  