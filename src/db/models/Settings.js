/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

// define the Settings model schema
const SettingsSchema = new mongoose.Schema({
  email: {
    type: String,
    default: 'info@ssaihq.com'
  },
  password: {
    type: String,
    index: true
  },
}, { timestamps: true });

module.exports = mongoose.model('settings', SettingsSchema);