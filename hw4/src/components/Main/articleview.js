import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Article from './article'
import AddArticle from './addArticle'
import Navigation from './navigation'
import Following from './follower'
import Headline from './headline'

export const ArticleView = (Articlelist) => {
    //arrange articles with latest-first
    let articleList = Object.keys(Articlelist.Articlelist).map((_id)=> Articlelist.Articlelist[_id]).sort((a,b)=>a.date===b.date?0:a.date<b.date?1:-1);
	return(
        <div>
        
        <Navigation/>
        
        <div className="container">
        <div className="col-sm-3 text-center">
        <Headline/>
        <Following/>
        </div>
        
        
        <div className="row panel">
        <div className="panel-body">
        
        <div className="row">
        
        <div className="col-sm-8 well">
        <AddArticle/>
        {articleList.map((article) => <Article 
			key = {article.id}
            time = {(article.date)}
			author = {article.author}
            title = {article.title}
			text = {article.text}
			imgsrc = {article.img}/>)
		}
		</div>
        </div>
        </div>
        </div>
        </div>
        </div>
		)}


    export default connect((state) => ({ Articlelist: state.articlelist})
    )(ArticleView)
