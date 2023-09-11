const router = require('express').Router();

const {
  makeExpressCallback,
  makeValidatorCallback,
  sessionChecker
} = require('../../middlewares');

// validator
const UMValidator = require('./um-user.validator');

// service
const UMService = require('./um-user.service');

// controller
const UMController = require('./um-user.controller');

// routes
const routes = require('./um-user.routes')({
  router,
  UMController,
  UMValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker,
});


module.exports = {
  UMController,
  UMService,
  UMRoutes: routes
};
