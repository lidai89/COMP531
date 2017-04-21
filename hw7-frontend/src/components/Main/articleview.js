import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Article from './article'
import AddArticle from './addArticle'
import Navigation from './navigation'
import Following from './follower'
import Headline from './headline'
import {filterarticle} from '../../actions'

export const ArticleView = ({Articlelist,followers,account,keyword,filterArticle,message}) => {
    //arrange articles with latest-first
    let articleList = Object.keys(Articlelist).map((_id)=> Articlelist[_id]).sort((a,b)=>a.date===b.date?0:a.date<b.date?1:-1)
    .filter(function (elem) {
    return (followers.some(item=>elem.author==item.userid))||elem.author==account;
    })
    .filter((item)=>{
			return item.text.toLowerCase().indexOf(keyword.toLowerCase()) >=0 ||
				   item.author.toLowerCase().indexOf(keyword.toLowerCase()) >=0
		});
    let newkeyword;
	return(
        <div>
        
        <Navigation/>
        
        <div className="container">
        <div className="col-sm-3 text-center">
        <Headline/>
        
        </div>
        
        
        
        
       
        
        <div className="col-sm-7 well">
        <AddArticle/>
        <textarea className="form-control"  rows="1" cols="18"  placeholder='Search' ref={(node) => { newkeyword = node } } onChange={()=>filterArticle(newkeyword.value)}></textarea>
        {articleList.map((article) => <Article 
			key = {article._id}
            id = {article._id}
            time = {(article.date)}
			author = {article.author}
            title = {article.title}
			text = {article.text}
			imgsrc = {article.img}
            comment= {article.comments}
            superauthor={account}/>)
		}
		
        
        </div>
        <div className="col-sm-2 text-center">
        <Following/>
        {message===''?'':
        <div className="row formRow alert alert-danger text-center"> {message} </div>}
        </div>
        
        </div>
        
        
        </div>
		)}


    export default connect((state) => ({ Articlelist: state.articlelist,keyword:state.keyword,
        followers:state.followerlist,
         message:state.message,
        account:state.account}),
    (dispatch) => {
        return{ filterArticle: (text) => dispatch(filterarticle(text))}}
    )(ArticleView)
