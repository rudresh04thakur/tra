
/**
 *
 * @param {object} UMRouter
 * @param {ExpressRouter} UMRouter.router
 * @param {UMController} UMRouter.UMController
 * @param {UMValidator} UMRouter.UMValidator
 * @param {makeExpressCallback} UMRouter.makeExpressCallback
 * @param {makeValidatorCallback} UMRouter.makeValidatorCallback
 * @param {sessionChecker} UMRouter.sessionChecker
 * @returns {ExpressRouter}
 */
module.exports = ({
  router,
  UMController,
  UMValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
}) => {
  router.get(
    '/',
    sessionChecker,
    makeValidatorCallback(UMValidator.validateListUM),
    makeExpressCallback(UMController.list),
  );
  router.get(
    '/add',
    sessionChecker,
    makeValidatorCallback(UMValidator.addDummy),
    makeExpressCallback(UMController.add),
  );
  router.post(
    '/add',
    sessionChecker,
    makeValidatorCallback(UMValidator.validateAddUM),
    makeExpressCallback(UMController.addPost),
  );
  router.get(
    '/edit/:id',
    sessionChecker,
    makeExpressCallback(UMController.edit),
  );
  router.post(
    '/update',
    sessionChecker,
    makeValidatorCallback(UMValidator.validateUpdateUM),
    makeExpressCallback(UMController.update),
  );
  router.get(
    '/list',
    sessionChecker,
    makeValidatorCallback(UMValidator.validateListUM),
    makeExpressCallback(UMController.list)
  );
  router.get(
    '/view/:id',
    sessionChecker,
    makeValidatorCallback(UMValidator.validateViewUM),
    makeExpressCallback(UMController.view),
  );
  router.post(
    '/delete',
    sessionChecker,
    makeValidatorCallback(UMValidator.validateDeleteUM),
    makeExpressCallback(UMController.delete),
  );
  return router;
};
