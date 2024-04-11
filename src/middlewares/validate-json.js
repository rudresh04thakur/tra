const { BadRequestError } = require('../utils/api-errors');

/**
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
module.exports = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    req.session.toaster = {type:'error',title:'Error',message: error.message};
    //throw new BadRequestError(err.message);
  }
  return next();
};
