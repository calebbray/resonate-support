const validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateOccurance(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.amount = !isEmpty(data.amount) ? data.amount : '';

  if (validator.isEmpty(data.name)) {
    errors.name = 'Please enter your supporters name';
  }

  if (validator.isEmpty(data.pledge_amount)) {
    errors.amount = 'Support amount is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
