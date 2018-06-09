const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Validation
const validateRegistration = require('../../validation/errors/register');
const validateLogin = require('../../validation/errors/login');

const User = require('../../models/Users');

// @route    GET api/users/test
// @desc     Tests profile route
// @access   Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route    POST api/users/register
// @desc     Register User
// @access   Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email Already Exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route    POST api/users/login
// @desc     Login to Platform
// @access   Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      errors.email = 'User not found';
      return res.status(400).json(errors);
    }

    // Check if password is correct
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Passwords Matched
        const payload = { id: user.id, name: user.name, isAdmin: user.isAdmin };

        // sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 18000 },
          (err, token) => {
            res.json({ success: true, token: 'Bearer ' + token });
          }
        );
      } else {
        errors.password = 'Password Incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route    GET api/users/current
// @desc     Return Current User
// @access   Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin
    });
  }
);

module.exports = router;
