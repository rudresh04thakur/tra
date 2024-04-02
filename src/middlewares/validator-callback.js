const { BadRequestError } = require('../utils/api-errors');

/**
 *
 * @param validator
 */
module.exports = (validator) => (req, res, next) => {
  const httpRequest = {
    body: req.body,
    query: req.query,
    params: req.params,
    session: req.session
  };
  const { error, value } = validator(httpRequest);
  if (error) {
    httpRequest.session.toaster = {type:'error',title:'Error',message: error.message};
    //throw new BadRequestError(error.message);
  }
  req.body = value;
  return next();
};
