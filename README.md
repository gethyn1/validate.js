# Javascript form validation

Simple form validation. The script hides and shows errors already on the page based on validation criteria. The benefit of this approach is greater flexibility when translating field errors on multi-lingual sites.

The script is easily extensible by adding extra tests to the `validateField` object.

The script requires associated SASS styles to correctly render errors in the browser.

## Available validation

The current available validation tests are:

- `required`
- `email`
- `postcode`
- `postcode_au`
- `number`
- `number_with_spaces`
- `length`
- `regex`
- `url`

## Implementation

The script works in the browser by wrapping a form input and validation message in a parent with a `data-validate` attribute. The validation message must have a corresponding `data-error` value. Here is an example for a required field:

```
<div data-validate="required">
  <label>Name:*</label>
  <input type="text" />
  <p class="error-info" data-error="required">Name is required</p>
</div>
```

Form field parents can use multiple validations:

```
<div data-validate="number length">
  <label>Favourite number (below 1000):</label>
  <input type="text" data-validate-length="3" />
  <p class="error-info" data-error="number">Please enter a number</p>
  <p class="error-info" data-error="length">Please enter a number below 1000</p>
</div>
```
