/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _dummy = __webpack_require__(/*! ./dummy */ 1);
	
	window.onload = function () {
	    document.querySelector("#login").onclick = _dummy.login;
	    document.querySelector("#logout").onclick = _dummy.logout;
	    document.querySelector("#headline").onclick = function () {
	        (0, _dummy.updateHeadline)(document.querySelector("#newHeadline").value);
	    };
	};

/***/ },
/* 1 */
/*!**********************!*\
  !*** ./src/dummy.js ***!
  \**********************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// Inclass Mocking Exercise
	// ========================
	//
	// This is the client code of our web application.
	// Most of the implementation has already been completed for you.
	//
	// To assure that Mocking is occuring correctly, you should try
	// changing the server url to something non-sensical.
	//
	// You are asked to implement the updateHeadline() function below.
	//
	
	var url = 'https://webdev-dummy.herokuapp.com';
	
	var resource = function resource(method, endpoint, payload) {
	    var options = {
	        method: method,
	        credentials: 'include',
	        headers: {
	            'Content-Type': 'application/json'
	        }
	    };
	    if (payload) options.body = JSON.stringify(payload);
	
	    return fetch(url + '/' + endpoint, options).then(function (r) {
	        if (r.status === 200) {
	            if (r.headers.get('Content-Type').indexOf('json') > 0) {
	                return r.json();
	            } else {
	                return r.text();
	            }
	        } else {
	            // useful for debugging, but remove in production
	            console.error(method + ' ' + endpoint + ' ' + r.statusText);
	            throw new Error(r.statusText);
	        }
	    });
	};
	
	var login = function login() {
	
	    var username = document.querySelector("#username");
	    var password = document.querySelector("#password");
	
	    var box = document.querySelector("#message");
	    return resource('POST', 'login', {
	        username: username.value,
	        password: password.value
	    }).then(function (r) {
	        return resource('GET', 'headlines');
	    }).then(function (r) {
	        var user = r.headlines[0];
	        box.innerHTML = 'you are logged in as ' + user.username + ' "' + user.headline + '"';
	        toggle(false);
	    }).catch(function (r) {
	        return box.innerHTML = '"' + (r.message || 'Error') + '" when logging in';
	    });
	};
	
	var logout = function logout() {
	    var box = document.querySelector("#message");
	    return resource('PUT', 'logout').then(function (r) {
	        return box.innerHTML = "You have logged out";
	    }).then(function (_) {
	        return toggle(true);
	    }).catch(function (r) {
	        return box.innerHTML = '"' + r.message + '" when logging out';
	    });
	};
	
	var toggle = function toggle(show) {
	    var toggleElement = function toggleElement(_show) {
	        return function (id) {
	            var el = document.querySelector(id);
	            if (el) {
	                el.style.display = _show ? 'inline' : 'none';
	            }
	        };
	    };
	    ['#username', '#password', '#login'].forEach(toggleElement(show));
	    ['#logout', '#headline', '#newHeadline'].forEach(toggleElement(!show));
	};
	
	var updateHeadline = function updateHeadline(headline) {
	    return resource('PUT', 'headline', { headline: headline }).then(function (response) {
	        console.log('New headline ' + response.headline);
	        // IMPLEMENT ME
	        //   * Update the headline shown in the #message box
	        // FYI response.headline = { username, headline }
	        var hdline = document.querySelector("#message");
	        hdline.innerHTML = 'you are logged in as ' + response.username + ' "' + response.headline + '"';
	    }).catch(function (r) {
	        return hdline.innerHTML = 'ERROR!';
	    });
	};
	
	exports.url = url;
	exports.login = login;
	exports.logout = logout;
	exports.updateHeadline = updateHeadline;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map