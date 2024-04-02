const router = require('express').Router();

const {
  makeExpressCallback,
  makeValidatorCallback,
  sessionChecker
} = require('../../middlewares');

// validator
const EmailValidator = require('./email.validator');

// service
const EmailService = require('./email.service');

// controller
const EmailController = require('./email.controller');

// routes
const routes = require('./email.routes')({
  router,
  EmailController,
  EmailValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
});


module.exports = {
  EmailController,
  EmailService,
  EmailRoutes: routes
};
