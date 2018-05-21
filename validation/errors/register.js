const validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateRegistration(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (validator.isEmpty(data.name)) {
    errors.name = 'Name is a required field';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is a required field';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'You must enter a valid email address';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is a required field';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  } else if (!validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
