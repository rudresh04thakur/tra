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
    makeExpressCallback(RequestController.list),
    sessionChecker
  );
  router.get(
    '/getPlace',    
    makeValidatorCallback(RequestValidator.validatePlace),
    makeExpressCallback(RequestController.getPlaceFromGoogle),
    sessionChecker
  );

  router.post('/getRequestDetails', 
  makeValidatorCallback(RequestValidator.validateEid),
  makeExpressCallback(RequestController.getRequestDetailsOnEid),
  sessionChecker
  );
  router.post('/getRequestList', 
  makeValidatorCallback(RequestValidator.validateListName),
  makeExpressCallback(RequestController.getRequestListOfName),
  sessionChecker
  );
  router.post('/getRequestFname', 
  makeValidatorCallback(RequestValidator.validateFname),
  makeExpressCallback(RequestController.getRequestDetailsOnFname),
  sessionChecker
  );
  router.post('/getRequestLname', 
  makeValidatorCallback(RequestValidator.validateLname),
  makeExpressCallback(RequestController.getRequestDetailsOnLname),
  sessionChecker
  );
  return router;
};
