const { uploadFile } = require("../../middlewares");

/**
 *
 * @param {object} UserRouter
 * @param {ExpressRouter} UserRouter.router
 * @param {UserController} UserRouter.UserController
 * @param {UserValidator} UserRouter.UserValidator
 * @param {makeExpressCallback} UserRouter.makeExpressCallback
 * @param {makeValidatorCallback} UserRouter.makeValidatorCallback
 * @param {sessionChecker} UserRouter.sessionChecker
 * @param {uploadFile} UserRouter.uploadFile
 * @returns {ExpressRouter}
 */
module.exports = ({
  router,
  UserController,
  UserValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
}) => {
  router.get(
    '/',
    makeValidatorCallback(UserValidator.validateListUser),
    makeExpressCallback(UserController.list),
    sessionChecker
  );
  router.get(
    '/add',
    makeValidatorCallback(UserValidator.addDummy),
    makeExpressCallback(UserController.add),
    sessionChecker
  );
  router.post(
    '/add',
    makeValidatorCallback(UserValidator.validateAddUser),
    makeExpressCallback(UserController.addPost),
    sessionChecker
  );
  router.get(
    '/edit/:id',
    makeExpressCallback(UserController.edit),
    sessionChecker
  );
  router.post(
    '/update',
    makeValidatorCallback(UserValidator.validateUpdateUser),
    makeExpressCallback(UserController.update),
    sessionChecker
  );
  router.get(
    '/list',
    makeValidatorCallback(UserValidator.validateListUser),
    makeExpressCallback(UserController.list),
    sessionChecker
  );
  router.get(
    '/view/:id',
    makeValidatorCallback(UserValidator.validateViewUser),
    makeExpressCallback(UserController.view),
    sessionChecker
  );
  router.get(
    '/delete/:id',
    makeValidatorCallback(UserValidator.validateDeleteUser),
    makeExpressCallback(UserController.delete),
    sessionChecker
  );
  router.post(
    '/uploadUser',
    uploadFile.single('file'),  
    makeExpressCallback(UserController.addUserByYaml),
  )
  return router;
};
