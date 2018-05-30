const validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateProfile(data) {
  let errors = {};
  data.site = !isEmpty(data.site) ? data.site : '';
  data.support_goal = !isEmpty(data.support_goal) ? data.support_goal : '';

  if (validator.isEmpty(data.site)) {
    errors.site = 'Please enter your Resonate Church site';
  }

  if (validator.isEmpty(data.support_goal)) {
    errors.support_goal = 'Support Goal is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
