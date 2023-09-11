/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');


// define the User model schema
const UMSchema = new mongoose.Schema({
  employee_email: {
    type: String,
    index: true
  },
  pm_email: {
    type: String,
    index: true
  },
  tm_email: {
    type: String,
    index: true
  },
  gl_email: {
    type: String,
    index: true
  },
  tc_email: {
    type: String,
    index: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

UMSchema.plugin(uniqueValidator, { message: 'is already taken.' });

module.exports = mongoose.model('usermanager', UMSchema);