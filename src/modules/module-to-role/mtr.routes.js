/**
 *
 * @param {object} ModuleToRoleRouter
 * @param {ExpressRouter} ModuleToRoleRouter.router
 * @param {RoleController} ModuleToRoleRouter.RoleController
 * @param {RoleValidator} ModuleToRoleRouter.RoleValidator
 * @param {makeExpressCallback} ModuleToRoleRouter.makeExpressCallback
 * @param {makeValidatorCallback} ModuleToRoleRouter.makeValidatorCallback
*  @param {sessionChecker} ModuleToRoleRouter.sessionChecker
 * @returns {ExpressRouter}
 */
module.exports = ({
  router,
  ModuleToRoleController,
  ModuleToRoleValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
}) => {
  router.get(
    '/',
    sessionChecker,
    makeValidatorCallback(ModuleToRoleValidator.validateListMtr),
    makeExpressCallback(ModuleToRoleController.list),
  );
  router.get(
    '/add',
    sessionChecker,
    makeExpressCallback(ModuleToRoleController.getAdd),
  );
  router.post(
    '/add',
    sessionChecker,
    makeValidatorCallback(ModuleToRoleValidator.validateAddMtr),
    makeExpressCallback(ModuleToRoleController.add),
  );
  router.get(
    '/edit/:id',
    sessionChecker,
    makeExpressCallback(ModuleToRoleController.edit),
  );
  router.post(
    '/update',
    sessionChecker,
    makeValidatorCallback(ModuleToRoleValidator.validateUpdateMtr),
    makeExpressCallback(ModuleToRoleController.update),
  );
  router.get(
    '/list',
    sessionChecker,
    makeValidatorCallback(ModuleToRoleValidator.validateListMtr),
    makeExpressCallback(ModuleToRoleController.list),
  );
  router.get(
    '/view/:id',
    sessionChecker,
    makeValidatorCallback(ModuleToRoleValidator.validateViewMtr),
    makeExpressCallback(ModuleToRoleController.view),
  );
  router.post(
    '/delete',
    sessionChecker,
    makeValidatorCallback(ModuleToRoleValidator.validateDeleteMtr),
    makeExpressCallback(ModuleToRoleController.delete),
  );
  return router;
};
