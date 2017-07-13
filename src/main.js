import validateForm from './modules/simple-validation'

const formToValidate = document.getElementById('form-to-validate')

formToValidate.addEventListener('submit', (event) => {
  event.preventDefault()

  if (validateForm(formToValidate)) {
    // eslint-disable-next-line
    window.alert('Good one. This form has no errors.')
  }
}, false)
