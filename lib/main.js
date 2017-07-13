'use strict';

var _simpleValidation = require('./modules/simple-validation');

var _simpleValidation2 = _interopRequireDefault(_simpleValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formToValidate = document.getElementById('form-to-validate');

formToValidate.addEventListener('submit', function (event) {
  event.preventDefault();

  if ((0, _simpleValidation2.default)(formToValidate)) {
    // eslint-disable-next-line
    window.alert('Good one. This form has no errors.');
  }
}, false);