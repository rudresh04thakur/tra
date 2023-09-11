const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

module.exports = {
  /**
   * Validates a login request.
   * @param {object} httpRequest - The HTTP request object.
   * @param {object} httpRequest.body - The request body.
   * @param {string} httpRequest.body.email - The email to validate.
   * @param {string} httpRequest.body.password - The password to validate.
   * @returns {object} - The validation result.
   */
  validateUpdateUM: (httpRequest) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      employee_email: Joi.string(),
      pm_email: Joi.string(),
      tm_email: Joi.string(),
      gl_email: Joi.string(),
      tc_email: Joi.string()
    });
    return schema.validate(httpRequest.body, options);
  },
  validateListUM: (httpRequest) => {
    const schema = Joi.object({
    });
    return schema.validate(httpRequest.body, options);
  },
  validateViewUM: (httpRequest) => {
    const schema = Joi.object({
      id: Joi.string().required()
    });
    Z
    return schema.validate(httpRequest.body, options);
  },
  validateDeleteUM: (httpRequest) => {
    const schema = Joi.object({
      id: Joi.string().required()
    });
    return schema.validate(httpRequest.body, options);
  },
  validateAddUM: (httpRequest) => {
    const schema = Joi.object({
      employee_email: Joi.string(),
      pm_email: Joi.string(),
      tm_email: Joi.string(),
      gl_email: Joi.string(),
      tc_email: Joi.string()
    });
    return schema.validate(httpRequest.body, options);
  },
  addDummy: (httpRequest) => {
    const schema = Joi.object({
    });
    return schema.validate(httpRequest.body, options);
  },
};
