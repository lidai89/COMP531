import {expect} from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import * as Action from './actions'
import Reducer from './reducers'
const initialItems = require('./data/articlelist.json')
const initialfollower=require('./data/follower.json')
const initialprofile=require('./data/profile.json')
const initialstate= {
    text: 'hello world!',
    articlelist:initialItems.articlelist,
    //followerlist:initialfollower.followerlist,
    followerlist:[],
    location: 'Landing Page',
    message: '',
    regmessage:'',
    keyword:'',
    account: 'guest',
    nextid:8,
    avatar:"http://www.hbc333.com/data/out/180/47265470-picture-cartoon.png",
    headline: "Javascript Test",
    profile:{
        username:initialprofile.myprofile[0].name,
        dob:initialprofile.myprofile[0].dob,
        email:initialprofile.myprofile[0].email,
        zipcode:initialprofile.myprofile[0].zipcode,
        avatar:initialprofile.myprofile[0].img,
        password:initialprofile.myprofile[0].password,
    }
}

describe('Validate reducer (no fetch requests here)', ()=> {

	it('Test Reducer: should initialize state', ()=>{
		expect(Reducer(undefined,{})).to.eql(initialstate)
	})


	it('Test Reducer: should state success (for displaying success message to user)',()=> {
		expect(Reducer(undefined,{type:Action.REGISTER, regmessage:'success!'}))
		.to.eql({...initialstate,regmessage:'success!'})
	})


	it('Test Reducer: should state error (for displaying error message to user)',()=> {
		expect(Reducer(undefined,{type:Action.ERROR, message:'error!'}))
		.to.eql({...initialstate, message:'error!'})
	})


	it('Test Reducer: should set the articles',()=> {
		expect(Reducer(undefined,{type:Action.GETARTICLE, articlelist:{
			1:{_id:1, text:'test', author:'dl37',date:'2017-03-23'}
		}}))
		.to.eql({...initialstate, articlelist:{1:{_id:1, text:'test', author:'dl37',date:'2017-03-23'}}})
	})


	it('Test Reducer: should set the search keyword',()=> {
		expect(Reducer(undefined,{type:Action.FILTERARTICLE, keyword:'keyword'}))
		.to.eql({...initialstate,keyword:'keyword'})
	})


	it('Test Reducer: should filter displayed articles by the search keyword',()=> {
       //the filter functio I used in article view
        const filterarticle=(articles,keyword)=>{return Object.keys(articles).map((_id)=> articles[_id]).filter((item)=>{
			return item.text.toLowerCase().indexOf(keyword.toLowerCase()) >=0 ||
				   item.author.toLowerCase().indexOf(keyword.toLowerCase()) >=0
        })};
		const articles = {1:{_id:1, text:'test', author:'dl37', date:'2017-1-1'},
						  2:{_id:2, text:'test filter', author:'sep1', date:'2017-2-2'}}
		const keyword = 'sep1'
		expect(filterarticle(articles,keyword)).to.eql([{_id:2, text:'test filter', author:'sep1', date:'2017-2-2'}]);
	})
})