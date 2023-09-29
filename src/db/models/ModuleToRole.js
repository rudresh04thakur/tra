/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

// define the Role model schema
const ModuleToRoleSchema = new mongoose.Schema({
  roleSlug: {
    type: String,
    default: 'admin'
  },
  tabs: [{
    type: String,
  }],
  modules:[{
    type: String,
  }]
}, { timestamps: true });

module.exports = mongoose.model('modulestorole', ModuleToRoleSchema);