const { NotFoundError } = require('../utils/api-errors');

/**
 *
 * @param req
 * @param res
 */
module.exports = (req, _res) => {
  const errorMessage = `Not Found: ${req.method} on ${req.url}`;
  return {status: 404, data: errorMessage};
  //throw new NotFoundError(errorMessage);
};
