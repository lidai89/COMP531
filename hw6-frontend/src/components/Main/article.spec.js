import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import * as Action from '../../actions'


describe('Validate Article actions', ()=> {
	
	let resource, url, getArticles, filterarticle
	
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
  		}
		resource = require('../../actions').resource
  		url = require('../../actions').url
  		getArticles = require('../../actions').addarticle
  		filterarticle = require('../../actions').filterarticle
	})

	afterEach(() => { 
  		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
  		}
	})


	it('Validate Article actions should fetch articles (mocked request)', (done)=>{
		mock(`${url}/articles`, {
			method: 'GET',
			headers: {'Content-Type':'application/json'},
			json:{articles:[]}
		})
        mock(`${url}/article`, {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			json:{articles:[]}
		})

		getArticles({article:'test'})((action)=>{
			try{
				expect(action.type).to.eql(Action.GETARTICLE)
				expect(action.articlelist).to.exist;
                expect(action.articlelist).to.eql([]);
				done()
			}
			catch(e){
				done(e)
			}	
		})
	})


	it('Validate Article actions should update the search keyword',()=> {
		const keyword = 'keyword'
		const action = filterarticle(keyword);
		expect(action.type).to.eql(Action.FILTERARTICLE)
		expect(action.keyword).to.eql(keyword)
	})
})