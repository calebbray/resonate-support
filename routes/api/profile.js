const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

//Load profile and User model
const Profile = require('../../models/Profile');
const User = require('../../models/Users');

const validateProfile = require('../../validation/errors/createProfile');
const validateSupporter = require('../../validation/errors/addSupporter');
const validateOccurance = require('../../validation/errors/addOccurance');

// @route    GET api/profile/test
// @desc     Tests profile route
// @access   Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route    GET api/profile/
// @desc     get the current profile
// @access   Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name'])
      .then(profile => {
        if (!profile) {
          errors.noProfile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route    GET api/profile/all
// @desc     get all profiles
// @access   Private
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.find()
      .populate('user', ['name', 'isAdmin'])
      .then(profiles => {
        if (!profiles) {
          errors.noProfiles = 'There are no profiles';
          res.status(404).json(errors);
        }
        res.json(profiles);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route    POST api/profile/
// @desc     Create or edit user profile
// @access   Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfile(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.site) profileFields.site = req.body.site;
    if (req.body.support_goal)
      profileFields.support_goal = req.body.support_goal;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update the current profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create and Save the new profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

// @route    POST api/profile/pledge_supporter
// @desc     Add a pledged supporter to profile
// @access   Private
router.post(
  '/pledge_supporter',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSupporter(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newSupporter = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        location: {
          address: req.body.address,
          city: req.body.city,
          state: req.body.state
        },
        pledge_amount: req.body.pledge_amount
      };
      profile.pledge_supporters.unshift(newSupporter);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route    POST api/profile/support_occurance
// @desc     Add a support occurance to the profile
// @access   Private
router.post(
  '/support_occurance',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOccurance(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newSupport = {
        name: req.body.name,
        amount: req.body.amount
      };
      profile.support_occurrences.unshift(newSupport);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route    DELETE api/profile/pledge_supporter/:ps_id
// @desc     Remove a supporter from your pledged list
// @access   Private
router.delete(
  '/pledge_supporter/:ps_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get the remove index
        const removeIndex = profile.pledge_supporters
          .map(item => item._id)
          .indexOf(req.params.ps_id);
        profile.pledge_supporters.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route    DELETE api/profile/
// @desc     Delete account from database
// @access   Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
