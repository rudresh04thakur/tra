/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');


// define the Role model schema
const EmailSchema = new mongoose.Schema({
  templateName: {
    type: String
  },
  title: {
    type: String
  },
  subject: {
    type: String
  },
  html: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('email', EmailSchema);