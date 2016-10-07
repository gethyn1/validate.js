'use strict';

import * as $ from '../../bower_components/utils.js/utils';

let errorClasses = [
	'required',
	'email',
	'postcode',
	'postcode_au',
	'number',
	'number_with_spaces',
	'length',
	'regex'
];

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

		// Only return false if value is entered
		return input.value ? regExp.test(input.value) : true;
	},
	number: (input) => {
		// Only return false if value is entered
		return input.value ? isNaN(input.value) === false : true;
	},
	number_with_spaces: (input) => {
		let val = input.value.replace(/ /g, '');

		// Only return false if value is entered
		return val ? isNaN(val) === false : true;
	},
	postcode: (input) => {
		let regExp = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/gi;

		// Only return false if value is entered
		return input.value ? regExp.test(input.value) : true;
	},
	postcode_au: (input) => {
		let regExp = /^[0-9]{4}$/;

		// Only return false if value is entered
		return input.value ? regExp.test(input.value) : true;
	},
	length: (input) => {
		let limit = input.getAttribute('data-validate-length'),
			length = input.value.length;

		// Only return false if value is entered
		return input.value ? (length <= limit) : true;
	},
	regex: (input) => {
		let pattern = input.getAttribute('data-validate-pattern'),
			flag = input.getAttribute('data-validate-flag'),
			regExp = new RegExp(pattern, flag);

		// Only return false if value is entered
		return input.value ? regExp.test(input.value) : true;
	}
};

export {validateForm};