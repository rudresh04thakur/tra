const router = require('express').Router();

const {
  makeExpressCallback,
  makeValidatorCallback,
  sessionChecker
} = require('../../middlewares');

// validator
const SettingsValidator = require('./settings.validator');

// service
const SettingsService = require('./settings.service');

// controller
const SettingsController = require('./settings.controller');

// routes
const routes = require('./settings.routes')({
  router,
  SettingsController,
  SettingsValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
});


module.exports = {
  SettingsController,
  SettingsService,
  SettingsRoutes: routes
};
