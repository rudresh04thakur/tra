const router = require('express').Router();

const {
  makeExpressCallback,
  makeValidatorCallback,
  sessionChecker
} = require('../../middlewares');

// validator
const ApproverRoleValidator = require('./ar.validator');

// service
const ApproverRoleService = require('./ar.service');

// controller
const ApproverRoleController = require('./ar.controller');

// routes
const routes = require('./ar.routes')({
  router,
  ApproverRoleController,
  ApproverRoleValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
});


module.exports = {
  ApproverRoleController,
  ApproverRoleService,
  ApproverRoleRoutes: routes
};
