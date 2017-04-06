import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as ReactBootstrap from 'react-bootstrap'
import { addarticle } from '../../actions'

export const AddArticle = ({author,newarticle}) => {
	//post a new article
    let article,props,image;
    var newtime=new Date().toISOString();
    
	return(
    <div>
    <ReactBootstrap.Panel header="Write Something" width='200'>
    <div className="card-block">
        <h4 className="card-title">Write your comment </h4>
    
        <textarea className="form-control" id="exampleTextarea" rows="3" cols="80" ref={(node) => { article = node }} placeholder='Comment'></textarea>
        <p className="card-text">Author: {author}</p>
        <label className="btn btn-default btn-file">Upload Image<input type="file" style={{display: 'none'}}  accept="image/*" onChange={(e) =>{image=e.target.files[0]}}/></label>
        <button type="button" className="btn btn-primary btn-sm pull-right" onClick={(e)=>newarticle({author:author,article:article.value,time:newtime,image:image})}>Post</button>
    </div>
    </ReactBootstrap.Panel>
    </div>
		)}

export default connect(

        (state)=>({author:state.account}),
        (dispatch) => ({
	newarticle: (input) => {dispatch(addarticle(input))}
        })
    )(AddArticle)  