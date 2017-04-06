import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import * as Action from '../../actions'

describe('Validate Profile actions (mocked requests)', ()=> {
	let resource, url, getProfile, updateHeadline
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
		resource = require('../../actions').resource
  		url = require('../../actions').url
  		getProfile = require('../../actions').getProfile
  		updateHeadline = require('../../actions').updateHeadline
	})

	afterEach(() => { 
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})

	it(" Test Profile: should fetch the user's proile information", (done)=>{
		mock(`${url}/dob`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{dob:'dobValue'}
		})
        mock(`${url}/email`, {
			method: 'PUT',
			headers: {'Content-Type':'application/json'},
			json:{email:'sucess'}
		})
        mock(`${url}/zipcode`, {
			method: 'PUT',
			headers: {'Content-Type':'application/json'},
			json:{zipcode:'success'}
		})
		mock(`${url}/zipcode`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{zipcode:'zipcodeValue'}
		})
		mock(`${url}/email`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{email:'emailValue'}
		})
		mock(`${url}/avatars`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{avatars:'avatarsValue'}
		})
		let count = 4
		getProfile()((action) => { 
			try{
				if(action.avatars){
					expect(action.avatars).to.eql('avatarsValue');
				}
				else if(action.email){
					expect(action.email).to.eql('emailValue');
				}
				else if(action.zipcode){
					expect(action.zipcode).to.eql('zipcodeValue');
				}
				else if(action.dob){
					expect(action.dob).to.eql('Invalid Date');
				}
				count--;
			}catch(e){
				done(e);
			}
		}).then(() => {
			expect(count).to.eql(0)
		}).then(done)
		.catch(done)
	})

	
	it(' Test Profile: should update headline',(done)=> {
		const username = 'dl37'
		const headline = 'test'

		mock(`${url}/headline`, {
			method: 'PUT',
			headers: {'Content-Type':'application/json'},
			json: {username, headline}
		})

		updateHeadline(headline)((action)=>{
			try{
				expect(action.type).to.eql(Action.UPDATE_TEXT)
				expect(action.text).to.eql(headline)
				done();
			}catch(e){
				done(e);
			}
		})
	})
})