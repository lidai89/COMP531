import mockery from 'mockery'
import  fetch,{mock} from 'mock-fetch'
import { expect } from 'chai'
import * as Action from './actions'
import  {resource,reporterror, displaySuccessMsg, Nav2Prof, Nav2Main} from './actions'


describe('Validate Authentication (involves mocked requests)', () => {

	let resource, url, loginAction, logoutAction
	
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
  		
		resource = require('./actions').resource
  		url = require('./actions').url
  		loginAction = require('./actions').userlogin
  		logoutAction = require('./actions').userlogout
	})

	afterEach(() => { 
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})
	it('Test Auth should log in a user', (done) => {
		const username = 'dl37'
		const password = 'needs-poetry-cake'
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json:{username, result:'success'}
		})
        



		const userlogin = (username,password) => {
		let status;
		const box = document.querySelector("#message")
		return (dispatch)=>{
		resource('POST', 'login', { username, password })
		.then(function(r){
		dispatch({type:Action.LOGIN,account:username,pw:password})
		})}}

		userlogin(username,password)((action) => {
			try {
				if(action.type===Action.LOGIN) {
					expect(action.account).to.eql(username);
					done();
				}
				
			} catch (e) {
				done(e)
			}
			
		})
		
		
	})

	it('Test Auth should not log in an invalid user', (done)=> {
		const username = 'dl37'
		const password = 'test'
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json:{username, result:'success'}
		})
        



		const userlogin = (username,password) => {
		let status;
		const box = document.querySelector("#message")
		return (dispatch)=>{
		resource('POST', 'login/invalid', { username, password })
		.then(function(r){
		dispatch({type:Action.LOGIN,account:username,pw:password})
		})
		.catch((e)=>{dispatch({type:Action.ERROR,message:'Invalid User'})})
		}}

		userlogin(username,password)((action) => {
			try{
				expect(action.type).to.eql(Action.ERROR);
				done();
			} catch(e){
				done(e);
			}
		})
	})

	



	it('Test Auth should log out a user (state should be cleared)', (done)=> {
		mock(`${url}/logout`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			json: {text:'OK'}
		})

		let count = 2;
		logoutAction()((action) => {
			try{
					expect(action.type).to.eql(Action.LOGOUT);
					done()
			}catch(e){
				done(e)
			}
		})
	})
})