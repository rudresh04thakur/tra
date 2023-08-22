const router = require('express').Router();

const {
  makeExpressCallback,
  makeValidatorCallback,
  sessionChecker
} = require('../../middlewares');

// validator
const RequestValidator = require('./request.validator');

// service
const RequestService = require('./request.service');

// controller
const RequestController = require('./request.controller');

// routes
const routes = require('./request.routes')({
  router,
  RequestController,
  RequestValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
});

// front routes
const frontroutes = require('./frontrequest.routes')({
  router,
  RequestController,
  RequestValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
});

module.exports = {
  RequestController,
  RequestService,
  RequestRoutes: routes,
  RequestFrontRoutes: frontroutes
};
