#Javascript form validation

This is an ES6 script for form validation. The script hides and shows errors already on the page based on validation criteria. The benefit of this approach is greater flexibility when translating field errors on multi-lingual sites.

The script is easily extensible by adding extra teststo the `validateField` object.

Current validation tests are *required*, *email*, *postcode*, and *number*.

##Roadmap:

1. Update *required* test for select, checkbox, radio and file inputs.
2. Add *range* and *length* tests.

All source code is located in `src` directory. The script uses helper functions from [utils.js](https://github.com/gethyn1/utils.js)