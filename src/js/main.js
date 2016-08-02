'use strict';
/* global Modernizr*/

/*
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

 app.js

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

 This is the entry point for front-end javascript

*/

import * as $ from '../../bower_components/utils.js/utils';
import * as validate from './validation';

var App = App || {};


/*
	
 Primary page function
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

*/

App.pageInit = () => {
	console.log('Initialised the app');

	let formToValidate = document.getElementById('form-to-validate');

	formToValidate.addEventListener('submit', function(evt) {

		if(validate.validateForm(formToValidate)) {
			window.alert('Good one. This form has no errors.');
		}

		evt.preventDefault();

	}, false);
};

App.pageInit();