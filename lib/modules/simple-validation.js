'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('./helpers');

var $ = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// A predefined set of error classes
var errorClasses = ['required', 'email', 'postcode', 'postcode_au', 'number', 'number_with_spaces', 'length', 'regex', 'url'];

// Validation tests
/* eslint-disable no-param-reassign */
var validateField = {
  required: function required(input) {
    return input.value;
  },
  email: function email(input) {
    // eslint-disable-next-line
    var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Only return false if value is entered
    return input.value ? regExp.test(input.value) : true;
  },
  // Only return false if value is entered
  number: function number(input) {
    return input.value ? isNaN(input.value) === false : true;
  },
  number_with_spaces: function number_with_spaces(input) {
    var val = input.value.replace(/ /g, '');

    // Only return false if value is entered
    return val ? isNaN(val) === false : true;
  },
  postcode: function postcode(input) {
    var regExp = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/gi;

    // Only return false if value is entered
    return input.value ? regExp.test(input.value) : true;
  },
  postcode_au: function postcode_au(input) {
    var regExp = /^[0-9]{4}$/;

    // Only return false if value is entered
    return input.value ? regExp.test(input.value) : true;
  },
  length: function length(input) {
    var limit = input.getAttribute('data-validate-length');
    var length = input.value.length;

    // Only return false if value is entered
    return input.value ? length <= limit : true;
  },
  regex: function regex(input) {
    var pattern = input.getAttribute('data-validate-pattern');
    var flag = input.getAttribute('data-validate-flag');
    var regExp = new RegExp(pattern, flag);

    // Only return false if value is entered
    return input.value ? regExp.test(input.value) : true;
  },
  url: function url(input) {
    // eslint-disable-next-line
    var regExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    // Only return false if value is entered
    return input.value ? regExp.test(input.value) : true;
  }

  // Validate a form
};var validateForm = function validateForm(form) {
  // Start listening for form errors
  var noFormErrors = true;

  // 1. Get elements with data-validate attr
  var inputs = form.querySelectorAll('[data-validate]');

  // 2. Loop through each attribute and validate input
  $.each(inputs, function (el) {
    // Remove current error classes
    errorClasses.forEach(function (item) {
      $.removeClass(el, 'form-error-' + item);
    });

    // Get each required validation
    var validateTypes = el.getAttribute('data-validate').split(' ');
    var input = el.getElementsByTagName('input')[0];

    // Perform validation on each validation type per input
    validateTypes.some(function (item) {
      // If error, add class and set formErrors to true
      if (!validateField[item](input)) {
        el.className += ' form-error-' + item;
        noFormErrors = false;

        // Exit some loop after first error for each input
        return true;
      }

      return null;
    });
  });

  // Return result of form errors
  return noFormErrors;
};

exports.default = validateForm;
/* eslint-enable no-param-reassign */