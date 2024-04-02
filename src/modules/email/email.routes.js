/**
 *
 * @param {object} EmailRouter
 * @param {ExpressRouter} EmailRouter.router
 * @param {EmailController} EmailRouter.EmailController
 * @param {EmailValidator} EmailRouter.EmailValidator
 * @param {makeExpressCallback} EmailRouter.makeExpressCallback
 * @param {makeValidatorCallback} EmailRouter.makeValidatorCallback
*  @param {sessionChecker} EmailRouter.sessionChecker
 * @returns {ExpressRouter}
 */
module.exports = ({
  router,
  EmailController,
  EmailValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
}) => {
  router.get(
    '/',
    sessionChecker,
    makeValidatorCallback(EmailValidator.validateListEmail),
    makeExpressCallback(EmailController.list),
  );
  router.get(
    '/add',
    sessionChecker,
    makeExpressCallback(EmailController.getAdd),
  );
  router.post(
    '/add',
    sessionChecker,
    makeValidatorCallback(EmailValidator.validateAddEmail),
    makeExpressCallback(EmailController.add),
  );
  router.get(
    '/edit/:id',
    sessionChecker,
    makeExpressCallback(EmailController.edit),
  );
  router.post(
    '/update',
    sessionChecker,
    makeValidatorCallback(EmailValidator.validateUpdateEmail),
    makeExpressCallback(EmailController.update),
  );
  router.get(
    '/list',
    sessionChecker,
    makeValidatorCallback(EmailValidator.validateListEmail),
    makeExpressCallback(EmailController.list),
  );
  router.get(
    '/view/:id',
    sessionChecker,
    makeValidatorCallback(EmailValidator.validateViewEmail),
    makeExpressCallback(EmailController.view),
  );
  router.post(
    '/delete',
    sessionChecker,
    makeValidatorCallback(EmailValidator.validateDeleteEmail),
    makeExpressCallback(EmailController.delete),
  );
  router.post(
    '/send',
    sessionChecker,
    makeExpressCallback(EmailController.sendMail),
  );
  router.get(
    '/send',
    sessionChecker,
    makeExpressCallback(EmailController.send),
  );
  return router;
};
