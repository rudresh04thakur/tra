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
    session: req.session,
    toastr: req.toastr,
  };
  const { error, value } = validator(httpRequest);
  if (error) {
    httpRequest.toastr.error(error.message,"Validation Error");
    //httpRequest.session.toaster = {type:'error',title:'Error',message: error.message};
    //throw new BadRequestError(error.message);
  }
  req.body = value;
  return next();
};
