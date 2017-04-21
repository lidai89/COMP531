import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'
import {shallow} from 'enzyme'

import {ArticleView} from './articleview'
import {AddArticle} from './addArticle'


describe('ArticlesView (component tests)', ()=> {
	
	it('ArticlesView (component tests) should render articles', ()=>{
		const articles = [{_id:1, text:'test1', author:'dl37', date:'2013-1-1',comments:[],img:''},
						  	{_id:2, text:'test2', author:'sep1', date:'2017-1-14',comments:[],img:''}];
        const followers=['dl37','sep1'];
        const node = shallow(<ArticleView Articlelist = {articles} followers={followers}/>)
		expect(node.children().nodes[1].props.children[1].props.children.length).to.eql(3);
	})


	it('ArticlesView (component tests) should dispatch actions to create a new article',()=> {
		let called = false
		const node = TestUtils.renderIntoDocument(<div><AddArticle newarticle={_ => called = true}/></div>)
		const elements = findDOMNode(node).children[0]
        const simbutton=elements.children[0].children[1].children[0].children[4]
		TestUtils.Simulate.click(simbutton)
		expect(called).to.be.true
	})
})