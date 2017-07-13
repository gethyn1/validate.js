/* eslint-disable no-param-reassign */
import * as $ from './helpers'

// A predefined set of error classes
const errorClasses = [
  'required',
  'email',
  'postcode',
  'postcode_au',
  'number',
  'number_with_spaces',
  'length',
  'regex',
  'url',
]

// Validation tests
const validateField = {
  required: input => (
    input.value
  ),
  email: (input) => {
    // eslint-disable-next-line
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    // Only return false if value is entered
    return input.value ? regExp.test(input.value) : true
  },
  // Only return false if value is entered
  number: input => (
    input.value ? isNaN(input.value) === false : true
  ),
  number_with_spaces: (input) => {
    const val = input.value.replace(/ /g, '')

    // Only return false if value is entered
    return val ? isNaN(val) === false : true
  },
  postcode: (input) => {
    const regExp = /[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}/gi

    // Only return false if value is entered
    return input.value ? regExp.test(input.value) : true
  },
  postcode_au: (input) => {
    const regExp = /^[0-9]{4}$/

    // Only return false if value is entered
    return input.value ? regExp.test(input.value) : true
  },
  length: (input) => {
    const limit = input.getAttribute('data-validate-length')
    const length = input.value.length

    // Only return false if value is entered
    return input.value ? (length <= limit) : true
  },
  regex: (input) => {
    const pattern = input.getAttribute('data-validate-pattern')
    const flag = input.getAttribute('data-validate-flag')
    const regExp = new RegExp(pattern, flag)

    // Only return false if value is entered
    return input.value ? regExp.test(input.value) : true
  },
  url: (input) => {
    // eslint-disable-next-line
    const regExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

    // Only return false if value is entered
    return input.value ? regExp.test(input.value) : true
  },
}


// Validate a form
const validateForm = (form) => {
  // Start listening for form errors
  let noFormErrors = true

  // 1. Get elements with data-validate attr
  const inputs = form.querySelectorAll('[data-validate]')

  // 2. Loop through each attribute and validate input
  $.each(inputs, (el) => {
    // Remove current error classes
    errorClasses.forEach((item) => {
      $.removeClass(el, `form-error-${item}`)
    })

    // Get each required validation
    const validateTypes = el.getAttribute('data-validate').split(' ')
    const input = el.getElementsByTagName('input')[0]

    // Perform validation on each validation type per input
    validateTypes.some((item) => {
      // If error, add class and set formErrors to true
      if (!validateField[item](input)) {
        el.className += ` form-error-${item}`
        noFormErrors = false

        // Exit some loop after first error for each input
        return true
      }

      return null
    })
  })

  // Return result of form errors
  return noFormErrors
}

export default validateForm
/* eslint-enable no-param-reassign */
