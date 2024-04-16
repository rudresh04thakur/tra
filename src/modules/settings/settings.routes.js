/**
 *
 * @param {object} SettingsRouter
 * @param {ExpressRouter} SettingsRouter.router
 * @param {SettingsController} SettingsRouter.SettingsController
 * @param {SettingsValidator} SettingsRouter.SettingsValidator
 * @param {makeExpressCallback} SettingsRouter.makeExpressCallback
 * @param {makeValidatorCallback} SettingsRouter.makeValidatorCallback
*  @param {sessionChecker} SettingsRouter.sessionChecker
 * @returns {ExpressRouter}
 */
module.exports = ({
  router,
  SettingsController,
  SettingsValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
}) => {
  router.get(
    '/',
    sessionChecker,
    makeValidatorCallback(SettingsValidator.validateListSettings),
    makeExpressCallback(SettingsController.list),
  );
  router.get(
    '/add',
    sessionChecker,
    makeExpressCallback(SettingsController.getAdd),
  );
  router.post(
    '/add',
    sessionChecker,
    makeValidatorCallback(SettingsValidator.validateAddSettings),
    makeExpressCallback(SettingsController.add),
  );
  router.get(
    '/edit/:id',
    sessionChecker,
    makeExpressCallback(SettingsController.edit),
  );
  router.post(
    '/update',
    sessionChecker,
    makeValidatorCallback(SettingsValidator.validateUpdateSettings),
    makeExpressCallback(SettingsController.update),
  );
  router.post(
    '/save-mailer',
    sessionChecker,
    makeValidatorCallback(SettingsValidator.validateSaveMailerSettings),
    makeExpressCallback(SettingsController.saveMailer),
  );
  router.post(
    '/save-template',
    sessionChecker,
    makeValidatorCallback(SettingsValidator.validateTemplateSettings),
    makeExpressCallback(SettingsController.saveTemplate),
  );
  router.get(
    '/list',
    sessionChecker,
    makeValidatorCallback(SettingsValidator.validateListSettings),
    makeExpressCallback(SettingsController.list),
  );
  router.get(
    '/view/:id',
    sessionChecker,
    makeValidatorCallback(SettingsValidator.validateViewSettings),
    makeExpressCallback(SettingsController.view),
  );
  router.post(
    '/delete',
    sessionChecker,
    makeValidatorCallback(SettingsValidator.validateDeleteSettings),
    makeExpressCallback(SettingsController.delete),
  );
  return router;
};
