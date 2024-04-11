const { UnauthorizedError } = require('../utils/api-errors');

/**
 *
 * @param roles
 */
module.exports = (roles) => (req, res, next) => {
  if (!req.user.role || !roles.includes(req.user.role)) {
    return {status: 401, data: 'Do not have access'};
    //throw new UnauthorizedError();
  }
  return next();
};
