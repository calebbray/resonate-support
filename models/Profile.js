const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

//Create Profile
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  site: {
    type: String,
    required: true
  },
  support_goal: {
    type: String,
    required: true
  },
  pledge_supporters: [
    {
      name: {
        type: String,
        required: true
      },
      phone: {
        type: String
      },
      email: {
        type: String
      },
      location: {
        address: {
          type: String
        },
        city: {
          type: String
        },
        state: {
          type: String
        }
      },
      pledge_amount: {
        type: String,
        required: true
      },
      date_added: {
        type: Number,
        default: moment().valueOf()
      }
    }
  ],
  support_occurrences: [
    {
      name: {
        type: String,
        required: true
      },
      amount: {
        type: String,
        required: true
      },
      date: {
        type: Number,
        default: moment().valueOf()
      }
    }
  ]
});

module.exports = Profile = mongoose.model('profile', profileSchema);
