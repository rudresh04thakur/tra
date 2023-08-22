const router = require('express').Router();

const {
  makeExpressCallback,
  makeValidatorCallback,
  sessionChecker,
  uploadFile
} = require('../../middlewares');

// validator
const UserValidator = require('./user.validator');

// service
const UserService = require('./user.service');

// controller
const UserController = require('./user.controller');

// routes
const routes = require('./user.routes')({
  router,
  UserController,
  UserValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker,
  uploadFile
});


module.exports = {
  UserController,
  UserService,
  UserRoutes: routes
};
