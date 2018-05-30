const validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateSupporter(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.pledge_amount = !isEmpty(data.pledge_amount) ? data.pledge_amount : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (validator.isEmpty(data.name)) {
    errors.name = 'Please enter your supporters name';
  }

  if (validator.isEmpty(data.pledge_amount)) {
    errors.pledge_amount = 'Supporters pledge amount is required';
  }

  if (!validator.isEmpty(data.email)) {
    if (!validator.isEmail(data.email)) {
      errors.email = 'Not a valid email';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
