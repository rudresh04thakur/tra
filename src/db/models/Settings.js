/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

// define the Settings model schema

const SettingsSchema = new mongoose.Schema({
  
}, { timestamps: true });

module.exports = mongoose.model('settings', SettingsSchema);