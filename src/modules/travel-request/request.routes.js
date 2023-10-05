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

  router.get(
    '/',
    sessionChecker,
    makeExpressCallback(RequestController.travel)
  );
  
  router.get(
    '/new',
    sessionChecker,
    makeExpressCallback(RequestController.travel)
  );

  router.post(
    '/travel',
    sessionChecker,
    makeValidatorCallback(RequestValidator.validateRequest),
    makeExpressCallback(RequestController.travelRequest),
  );

  router.get(
    '/edit/:id',
    sessionChecker,
    makeExpressCallback(RequestController.travelEdit),
    
  );

  router.get(
    '/view/:id',
    sessionChecker,
    makeExpressCallback(RequestController.travelView),
    
  );

  router.get(
    '/approve/:id',
    sessionChecker,
    makeExpressCallback(RequestController.travelApprove),
    
  );

  router.post(
    '/update',
    sessionChecker,
    makeValidatorCallback(RequestValidator.validateRequest),
    makeExpressCallback(RequestController.travelRequest),
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

  router.post('/approve',
    sessionChecker,
    makeValidatorCallback(RequestValidator.validateApprove),
    makeExpressCallback(RequestController.travelPostApprove),
  );
  router.post('/reject',
    sessionChecker,
    makeValidatorCallback(RequestValidator.validateApprove),
    makeExpressCallback(RequestController.travelPostReject),
  );
  router.post(
    '/delete',
    sessionChecker,
    makeValidatorCallback(RequestValidator.validateDeleteRole),
    makeExpressCallback(RequestController.delete),
  );

  return router;
};
