/**
 *
 * @param {object} ApproverRoleRouter
 * @param {ExpressRouter} ApproverRoleRouter.router
 * @param {RoleController} ApproverRoleRouter.RoleController
 * @param {RoleValidator} ApproverRoleRouter.RoleValidator
 * @param {makeExpressCallback} ApproverRoleRouter.makeExpressCallback
 * @param {makeValidatorCallback} ApproverRoleRouter.makeValidatorCallback
*  @param {sessionChecker} ApproverRoleRouter.sessionChecker
 * @returns {ExpressRouter}
 */
module.exports = ({
  router,
  ApproverRoleController,
  ApproverRoleValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
}) => {
  router.get(
    '/',
    sessionChecker,
    makeValidatorCallback(ApproverRoleValidator.validateListAr),
    makeExpressCallback(ApproverRoleController.list),
  );
  router.get(
    '/add',
    sessionChecker,
    makeExpressCallback(ApproverRoleController.getAdd),
  );
  router.post(
    '/add',
    sessionChecker,
    makeValidatorCallback(ApproverRoleValidator.validateAddAr),
    makeExpressCallback(ApproverRoleController.add),
  );
  router.get(
    '/edit/:id',
    sessionChecker,
    makeExpressCallback(ApproverRoleController.edit),
  );
  router.post(
    '/update',
    sessionChecker,
    makeValidatorCallback(ApproverRoleValidator.validateUpdateAr),
    makeExpressCallback(ApproverRoleController.update),
  );
  router.get(
    '/list',
    sessionChecker,
    makeValidatorCallback(ApproverRoleValidator.validateListAr),
    makeExpressCallback(ApproverRoleController.list),
  );
  router.get(
    '/view/:id',
    sessionChecker,
    makeValidatorCallback(ApproverRoleValidator.validateViewAr),
    makeExpressCallback(ApproverRoleController.view),
  );
  router.post(
    '/delete',
    sessionChecker,
    makeValidatorCallback(ApproverRoleValidator.validateDeleteAr),
    makeExpressCallback(ApproverRoleController.delete),
  );
  return router;
};
