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
/******/ 	__webpack_require__.p = "/Users/gethynjones/Sites/_jsdev/validate.js/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/* global Modernizr*/
	
	/*
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	 app.js
	
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	 This is the entry point for front-end javascript
	
	*/
	
	var _utils = __webpack_require__(1);
	
	var $ = _interopRequireWildcard(_utils);
	
	var _validation = __webpack_require__(2);
	
	var validate = _interopRequireWildcard(_validation);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var App = App || {};
	
	/*
		
	 Primary page function
	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	
	*/
	
	App.pageInit = function () {
		console.log('Initialised the app');
	
		var formToValidate = document.getElementById('form-to-validate');
	
		formToValidate.addEventListener('submit', function (evt) {
	
			if (validate.validateForm(formToValidate)) {
				window.alert('Good one. This form has no errors.');
			}
	
			evt.preventDefault();
		}, false);
	};
	
	App.pageInit();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	/*
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	 utils.js
	
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	 A set of utilities for front-end javascript development
	
	*/
	
	/*
		
	 Grid toggle
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	*/
	
	// Grid overlay toggle
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var toggleGrid = exports.toggleGrid = function toggleGrid(e, grid) {
		grid.classList.toggle('is-visible');
		e.preventDefault();
	};
	
	var initToggler = exports.initToggler = function initToggler(grid, toggle) {
		toggle.addEventListener('click', function (e) {
			toggleGrid(e, grid);
		}, false);
	};
	
	/*
		
	 Class functions for DOM elements
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	*/
	
	// Has class
	var hasClass = exports.hasClass = function hasClass(el, className) {
		return new RegExp('(\\s|^)' + className + '(\\s|$)').test(el.className);
	};
	
	// Remove class
	var removeClass = exports.removeClass = function removeClass(el, className) {
		if (el.classList) {
			el.classList.remove(className);
		} else {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	};
	
	// Toggle class
	var toggleClass = exports.toggleClass = function toggleClass(el, className) {
		if (el.classList) {
			el.classList.toggle(className);
		} else {
			var classes = el.className.split(' ');
			var existingIndex = classes.indexOf(className);
	
			if (existingIndex >= 0) {
				classes.splice(existingIndex, 1);
			} else {
				classes.push(className);
			}
	
			el.className = classes.join(' ');
		}
	};
	
	/*
		
	 Wrap DOM elements
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	*/
	
	// Wrap a single element
	var wrap = exports.wrap = function wrap(el, wrapper) {
		el.parentNode.insertBefore(wrapper, el);
		wrapper.appendChild(el);
	};
	
	// Wrap a group of elements
	var wrapAll = exports.wrapAll = function wrapAll(els, wrapper) {
		els[0].parentNode.insertBefore(wrapper, els[0]);
	
		for (var i = 0; i < els.length; i++) {
			wrapper.appendChild(els[i]);
		}
	};
	
	/*
		
	 Throttle and debounce
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	*/
	
	// Throttle
	var throttle = exports.throttle = function throttle(func, delay) {
	
		delay = delay || 42;
	
		var waiting = false,
		    funcTimeoutId = void 0;
	
		return function () {
			if (!waiting) {
				waiting = true;
				clearTimeout(funcTimeoutId);
				funcTimeoutId = setTimeout(function () {
					func.call();
					waiting = false;
				}, delay);
			}
		};
	};
	
	/*
		
	 Get information about elements
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	*/
	
	// Get x / y coordinates relative to document - set includeScroll to true to include browser scroll position
	// Helper function to get an element's exact position
	var getPosition = exports.getPosition = function getPosition(el, includeScroll) {
	
		var xPos = 0,
		    yPos = 0;
	
		while (el) {
			if (el.tagName == "BODY") {
	
				// deal with browser quirks with body/window/document and page scroll
				var xScroll = includeScroll ? el.scrollLeft || document.documentElement.scrollLeft : 0;
				var yScroll = includeScroll ? el.scrollTop || document.documentElement.scrollTop : 0;
	
				xPos += el.offsetLeft - xScroll + el.clientLeft;
				yPos += el.offsetTop - yScroll + el.clientTop;
			} else {
	
				// for all other non-BODY elements
				if (includeScroll) {
					xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
					yPos += el.offsetTop - el.scrollTop + el.clientTop;
				} else {
					xPos += el.offsetLeft + el.clientLeft;
					yPos += el.offsetTop + el.clientTop;
				}
			}
	
			el = el.offsetParent;
		}
	
		return {
			x: xPos,
			y: yPos
		};
	};
	
	// Get browser width
	var browserWidth = exports.browserWidth = function browserWidth() {
		if (self.innerHeight) {
			return self.innerWidth;
		}
	
		if (document.documentElement && document.documentElement.clientWidth) {
			return document.documentElement.clientWidth;
		}
	
		if (document.body) {
			return document.body.clientWidth;
		}
	};
	
	// Get browser height
	var browserHeight = exports.browserHeight = function browserHeight() {
		if (self.innerHeight) {
			return self.innerHeight;
		}
	
		if (document.documentElement && document.documentElement.clientHeight) {
			return document.documentElement.clientHeight;
		}
	
		if (document.body) {
			return document.body.clientHeight;
		}
	};
	
	/*
		
	 Convert collection of DOM elements to array
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	*/
	
	var toArray = exports.toArray = function toArray(obj) {
		var array = [];
	
		// iterate backwards ensuring that length is an UInt32
		for (var i = obj.length >>> 0; i--;) {
			array[i] = obj[i];
		}
	
		return array;
	};
	
	/*
		
	 Traverse the DOM
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	*/
	
	// Get next sibling
	var next = exports.next = function next(el) {
		var nextSibling = el.nextSibling;
		while (nextSibling && nextSibling.nodeType != 1) {
			nextSibling = nextSibling.nextSibling;
		}
	
		return nextSibling;
	};
	
	/*
		
	 Iterative functions
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	*/
	
	// Iterate over array like set of elements
	var each = exports.each = function each(els, callback) {
		Array.prototype.forEach.call(els, callback);
	};
	
	// create a one-time event
	var once = exports.once = function once(node, type, callback) {
	
		// create event
		node.addEventListener(type, function (e) {
			// remove event
			e.target.removeEventListener(e.type, arguments.callee);
			// call handler
			return callback(e);
		});
	};
	
	// Serialize form input values to json object
	// NOTE:
	// could probably achieve this without serializing (i.e. straight to json)
	// but its useful to have the serialize option so leaving for now
	var serializeToJson = exports.serializeToJson = function serializeToJson(form) {
	
		var field = void 0,
		    s = [],
		    jsonObj = {};
	
		// Encode all form fields
		if ((typeof form === 'undefined' ? 'undefined' : _typeof(form)) == 'object' && form.nodeName == 'FORM') {
			var len = form.elements.length;
			for (var i = 0; i < len; i++) {
				field = form.elements[i];
				if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
					if (field.type == 'select-multiple') {
						for (var j = form.elements[i].options.length - 1; j >= 0; j--) {
							if (field.options[j].selected) s[s.length] = encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[j].value);
						}
					} else if (field.type != 'checkbox' && field.type != 'radio' || field.checked) {
						s[s.length] = encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value);
					}
				}
			}
		}
	
		s.forEach(function (el, i) {
			var split = el.split('=');
	
			// Decode then unencode to make sure we don't split string at wrong place by accident
			jsonObj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
		});
	
		return jsonObj;
	};
	
	/*
		
	 Get query parameter from url
	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	*/
	
	var getQueryParam = exports.getQueryParam = function getQueryParam(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
		    results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.validateForm = undefined;
	
	var _utils = __webpack_require__(1);
	
	var $ = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var errorClasses = ['required', 'email', 'postcode', 'number', 'range', 'length'];
	
	// Validate a form
	var validateForm = function validateForm(form) {
	
		// Start listening for form errors
		var noFormErrors = true;
	
		// 1. Get elements with data-validate attr
		var inputs = form.querySelectorAll('[data-validate]');
	
		// 2. Loop through each attribute and validate input
		$.each(inputs, function (el, i) {
	
			// Remove current error classes
			errorClasses.forEach(function (item, i) {
				$.removeClass(el, 'form-error-' + item);
			});
	
			// Get each required validation
			var validateTypes = el.getAttribute('data-validate').split(' '),
			    input = el.getElementsByTagName('input')[0];
	
			// Perform validation on each validation type per input
			validateTypes.some(function (item, i) {
	
				// If error, add class and set formErrors to true
				if (!validateField[item](input)) {
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
	var validateField = {
		required: function required(input) {
			return input.value;
		},
		email: function email(input) {
			var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return regExp.test(input.value);
		},
		number: function number(input) {
			return input.value && isNaN(input.value) === false;
		},
		postcode: function postcode(input) {
			var regExp = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/gi;
			return regExp.test(input.value);
		}
	};
	
	exports.validateForm = validateForm;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map