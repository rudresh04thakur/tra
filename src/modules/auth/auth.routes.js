/**
 *
 * @param {object} AuthRouter
 * @param {ExpressRouter} AuthRouter.router
 * @param {AuthController} AuthRouter.AuthController
 * @param {AuthValidator} AuthRouter.AuthValidator
 * @param {makeExpressCallback} AuthRouter.makeExpressCallback
 * @param {makeValidatorCallback} AuthRouter.makeValidatorCallback
 * @param {sessionChecker} AuthRouter.sessionChecker
 * @returns {ExpressRouter}
 */
module.exports = ({
  router,
  AuthController,
  AuthValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
}) => {
  router.post(
    '/login',
    sessionChecker,
    makeValidatorCallback(AuthValidator.validateLogin),
    makeExpressCallback(AuthController.login)
  );
  router.post(
    '/register',
    sessionChecker,
    makeValidatorCallback(AuthValidator.validateRegister),
    makeExpressCallback(AuthController.register)
  );
  router.post(
    '/reset',
    makeValidatorCallback(AuthValidator.validateReset),
    makeExpressCallback(AuthController.resetPassword)
  );
  router.get(
    '/logout',
    makeExpressCallback(AuthController.logout)
  );
  router.get(
    '/okta-login',
    makeExpressCallback(AuthController.oktaLogin)
  );
  return router;
};
