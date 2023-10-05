/**
 *
 * @param {object} DashboardRouter
 * @param {ExpressRouter} DashboardRouter.router
 * @param {DashboardController} DashboardRouter.DashboardController
 * @param {DashboardValidator} DashboardRouter.DashboardValidator
 * @param {makeExpressCallback} DashboardRouter.makeExpressCallback
 * @param {makeValidatorCallback} DashboardRouter.makeValidatorCallback
*  @param {sessionChecker} DashboardRouter.sessionChecker
 * @returns {ExpressRouter}
 */
module.exports = ({
  router,
  DashboardController,
  DashboardValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
}) => {
  router.get(
    '/',
    sessionChecker,
    makeValidatorCallback(DashboardValidator.validateDashboard),
    makeExpressCallback(DashboardController.dashboard),
  );
  return router;
};
