/**
 *
 * @param {object} RoleRouter
 * @param {ExpressRouter} RoleRouter.router
 * @param {RoleController} RoleRouter.RoleController
 * @param {RoleValidator} RoleRouter.RoleValidator
 * @param {makeExpressCallback} RoleRouter.makeExpressCallback
 * @param {makeValidatorCallback} RoleRouter.makeValidatorCallback
*  @param {sessionChecker} RoleRouter.sessionChecker
 * @returns {ExpressRouter}
 */
module.exports = ({
  router,
  RoleController,
  RoleValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
}) => {
  router.get(
    '/',
    makeValidatorCallback(RoleValidator.validateListRole),
    makeExpressCallback(RoleController.list),
    sessionChecker
  );
  router.get(
    '/edit/:id',
    makeExpressCallback(RoleController.edit),
    sessionChecker
  );
  router.post(
    '/update',
    makeValidatorCallback(RoleValidator.validateUpdateRole),
    makeExpressCallback(RoleController.update),
    sessionChecker
  );
  router.get(
    '/list',
    makeValidatorCallback(RoleValidator.validateListRole),
    makeExpressCallback(RoleController.list),
    sessionChecker
  );
  router.get(
    '/view/:id',
    makeValidatorCallback(RoleValidator.validateViewRole),
    makeExpressCallback(RoleController.view),
    sessionChecker
  );
  router.post(
    '/delete',
    makeValidatorCallback(RoleValidator.validateDeleteRole),
    makeExpressCallback(RoleController.delete),
    sessionChecker
  );
  return router;
};
