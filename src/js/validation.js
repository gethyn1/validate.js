'use strict';

import * as $ from '../../bower_components/utils.js/utils';

let errorClasses = ['required', 'email', 'postcode', 'number', 'range', 'length'];

// Validate a form
let validateForm = (form) => {

	// Start listening for form errors
	let noFormErrors = true;

	// 1. Get elements with data-validate attr
	let inputs = form.querySelectorAll('[data-validate]');

	// 2. Loop through each attribute and validate input
	$.each(inputs, function(el,i) {

		// Remove current error classes
		errorClasses.forEach(function(item, i) {
			$.removeClass(el, 'form-error-' + item);
		});

		// Get each required validation
		let validateTypes = el.getAttribute('data-validate').split(' '),
			input = el.getElementsByTagName('input')[0];

		// Perform validation on each validation type per input
		validateTypes.some(function(item,i) {
			
			// If error, add class and set formErrors to true
			if(!validateField[item](input)) {
				el.className += ' form-error-' + item;
				noFormErrors = false;
				
				// Exit some loop after first error for each input
				return true;
			}
		});
	});

	// Return result of form errors
	return noFormErrors;
};

// Validation tests
let validateField = {
	required: (input) => {
		return input.value;
	},
	email: (input) => {
		let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return regExp.test(input.value);
	},
	number: (input) => {
		return input.value && isNaN(input.value) === false;
	},
	postcode: (input) => {
		let regExp = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/gi;
		return regExp.test(input.value);
	}
};

export {validateForm};