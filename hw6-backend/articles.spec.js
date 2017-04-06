/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME
		let options =  {
			method: 'GET',
        	headers: {'Content-Type': 'application/json'}
    	}
		fetch(url("/articles"),options)
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json();
		})
		.then(body => {
			expect(body.articles.length).to.least(3);
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		
		let id1, id2
		// add a new article
		const firstArticle = "This is my 1st post article!"
		const secondArticle = "This is my 2rd post article!"
		let options1 =  {
			method: 'POST',
        	headers: {'Content-Type': 'application/json'},
        	body: JSON.stringify({
        		"author": "A1",
				"text": firstArticle
        	})
    	}
		fetch(url("/article"),options1)
		.then(res => {
			// verify you get the article back with an id
			expect(res.status).to.eql(200)
			return res.json();
		})
		.then(body => {
			expect(body.id).to.exist;
			id1 = body.id;
			// verify the content of the article
			expect(body.text).to.eql(firstArticle);
		}).then( _=>{
			// add a second article
			let options2 =  {
				method: 'POST',
        		headers: {'Content-Type': 'application/json'},
        		body: JSON.stringify({
        			"author": "A2",
					"text": secondArticle
        		})
    		}
		 	return fetch(url("/article"),options2)
		})
		.then(res => {
			// verify you get the article back with an id
			expect(res.status).to.eql(200)
			return res.json();
		})
		.then(body => {
			expect(body.id).to.exist;
			id2 = body.id;
			// verify the article id increases by one
			expect(id2).to.eql(id1+1);
			// verify the second artice has the correct content
			expect(body.text).to.eql(secondArticle);
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		let options =  {
			method: 'GET',
        	headers: {'Content-Type': 'application/json'}
    	}
		fetch(url("/articles"),options)
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json();
		})
		.then(body => {
			expect(body.articles.length).to.least(3);
			return body.articles[0].id;
		})
		.then( randID =>{
			// then call GET /articles/id with the chosen id
			return fetch(url(`/articles/${randID}`), options)
		})
		.then( res => {
			expect(res.status).to.eql(200)	
			return res.json();
		})
		.then(body => {
			// validate that only one article is returned
			expect(body.articles.length).to.eql(1);
		})
		.then(done)
		.catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		let options =  {
			method: 'GET',
        	headers: {'Content-Type': 'application/json'}
    	}
		fetch(url("/articles/0"),options)
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.json();
		})
		.then(body => {
			// confirm that you get no results
			expect(body.articles.length).to.eql(0);
		})
		.then(done)
		.catch(done)
	}, 200)

});
