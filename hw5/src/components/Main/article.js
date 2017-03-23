import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Comments from './comment'
import * as ReactBootstrap from 'react-bootstrap'
const Article = ({title,imgsrc,text,author,key,time,comment}) => {
	//article session with images, text, author and button
    var newtime=new Date(time);
	return(
    <div>
    <ReactBootstrap.Panel header={title} width='300'>
    <img className="card-img-top" src={imgsrc} alt="Card image cap" width='300' style={{display:imgsrc?'block':'none'}}/>
    <div className="card-block">
        <h4 className="card-title">{author} said on {newtime.toLocaleDateString()} at {newtime.toLocaleTimeString()} </h4>
        <p className="card-text">{text}</p>
        <p className="card-text">Author: {author}</p>
        
        <Comments commentlist={comment}/>
    </div>
    </ReactBootstrap.Panel>
    </div>
		)}

	export default connect(
    )(Article)  