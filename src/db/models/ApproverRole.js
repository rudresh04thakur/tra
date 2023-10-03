/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

// define the Role model schema
const ApproverRoleSchema = new mongoose.Schema({
  roleSlug: {
    type: String,
  },
  priority: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('approverrole', ApproverRoleSchema);