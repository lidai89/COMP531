import mockery from 'mockery'
import  fetch,{mock} from 'mock-fetch'
import { expect } from 'chai'
import * as Action from './actions'
import  {resource,reporterror, Nav2Prof, Nav2Main} from './actions'

//const fetch = require('isomorphic-fetch')
describe('Validate Action functionality', () => {

	let resource,url;	

	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  			resource = require('./actions').resource
  			url = require('./actions').url
  		}
	})

	afterEach(() => {
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

	
	it('Test Actions: resource should be a resource', (done)=> {
		mock(`${url}/sample`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json: {test:'test1'}
		})

		resource('GET', 'sample').then((response) => {
           // console.log(response)
			expect(response.test).to.exist;
		})
		.then(done)
		.catch(done)
	})


	it('Test Actions: resource should give me the http error', (done)=> {

		resource('POST', 'login_invalid_address').catch((err) => {
			expect(err).to.exist;
		})
		.then(done)
		.catch(done)
	})


	it('Test Actions: resource should be POSTable', (done)=> {
		const username = 'dl37'
		const password = 'test'
		
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, result:"success"}
		})

		resource('POST', 'login', {username, password}).then((response) => {
			expect(response).to.eql({username: "dl37", result: "success"})
		})
		.then(done)
		.catch(done)
	})


	it('Test Actions: should update error message (for displaying error mesage to user)', ()=>{
		const msg = 'test error message';
		const expectAction = {
			type: Action.ERROR,
			message: msg
		}
		expect(reporterror(msg)).to.eql(expectAction);
	})


	it('Test Actions: should update success message (for displaying success message to user)', (done)=>{
		const msg = 'test success message';
		const username='dl37'
		mock(`${url}/register`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, result:"success"}
		})
		resource('POST', 'register', {test:'test'}).then((response) => {
			expect(response).to.eql({username: "dl37", result: "success"})
		})
		.then(done)
		.catch(done)
	})


	it('Test Actions: should navigate (to profile, main, or landing)', ()=>{
		expect(Nav2Prof()).to.eql({type: Action.NAV2PROF});
		expect(Nav2Main()).to.eql({type: Action.NAV2MAIN});
	})
})