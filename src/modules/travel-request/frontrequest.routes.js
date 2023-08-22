
const moment = require('moment');

/**
 *
 * @param {object} RequestRouter
 * @param {ExpressRouter} RequestRouter.router
 * @param {RequestController} RequestRouter.RequestController
 * @param {RequestValidator} RequestRouter.RequestValidator
 * @param {makeExpressCallback} RequestRouter.makeExpressCallback
 * @param {makeValidatorCallback} RequestRouter.makeValidatorCallback
 * @returns {ExpressRouter}
 */
module.exports = ({
  router,
  sessionChecker,
  // RequestController,
  // RequestValidator,
  // makeValidatorCallback,
  // makeExpressCallback,
}) => {
  router.get('/',sessionChecker,function(req, res, next){
    res.render('requestform',{minDate: moment().format('YYYY-MM-DD')});
  })
  return router;
};
//    // mongodb://root:root@localhost:27017/?authMechanism=DEFAULT