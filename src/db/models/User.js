/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');


// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/]
  },
  role: {
    type: String,
    default: 'user'
  },
  password: {
    type: String,
  },
  fname: {
    type: String,
    match: [/^[a-zA-Z ]+$/, 'is invalid'],
  },
  lname: {
    type: String,
    match: [/^[a-zA-Z ]+$/, 'is invalid'],
    index: true
  },
  isDeleted: {
    type: Boolean,
  },
  phone: {
    type: String,
  },
  employeeCode: {
    type: String,
  },
  employer: {
    type: String,
  }
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

module.exports = mongoose.model('users', UserSchema);