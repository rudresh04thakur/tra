/**
 *
 * @param {object} RequestRouter
//  * @param {ExpressRouter} RequestRouter.router
//  * @param {RequestController} RequestRouter.RequestController
//  * @param {RequestValidator} RequestRouter.RequestValidator
//  * @param {makeExpressCallback} RequestRouter.makeExpressCallback
//  * @param {makeValidatorCallback} RequestRouter.makeValidatorCallback
//  * @param {sessionChecker} RequestRouter.sessionChecker
 * @returns {ExpressRouter}
 */
module.exports = ({
  router,
  RequestController,
  RequestValidator,
  makeValidatorCallback,
  makeExpressCallback,
  sessionChecker
}) => {
  router.post(
    '/travel',
    makeValidatorCallback(RequestValidator.validateRequest),
    makeExpressCallback(RequestController.travelRequest),
    sessionChecker
  );
  router.get(
    '/list',
    sessionChecker,
    makeExpressCallback(RequestController.list),
  );
  router.get(
    '/getPlace',    
    sessionChecker,
    makeValidatorCallback(RequestValidator.validatePlace),
    makeExpressCallback(RequestController.getPlaceFromGoogle),
  );

  router.post('/getRequestDetails', 
  sessionChecker,
  makeValidatorCallback(RequestValidator.validateEid),
  makeExpressCallback(RequestController.getRequestDetailsOnEid),
  );
  router.post('/getRequestList', 
  sessionChecker,
  makeValidatorCallback(RequestValidator.validateListName),
  makeExpressCallback(RequestController.getRequestListOfName),
  );
  router.post('/getRequestFname', 
  sessionChecker,
  makeValidatorCallback(RequestValidator.validateFname),
  makeExpressCallback(RequestController.getRequestDetailsOnFname),
  );
  router.post('/getRequestLname', 
  sessionChecker,
  makeValidatorCallback(RequestValidator.validateLname),
  makeExpressCallback(RequestController.getRequestDetailsOnLname),
  );
  return router;
};
