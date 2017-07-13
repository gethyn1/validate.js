'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-param-reassign */

// Iterate over array like set of elements
var each = exports.each = function each(els, callback) {
  Array.prototype.forEach.call(els, callback);
};

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
/* eslint-ensable no-param-reassign */