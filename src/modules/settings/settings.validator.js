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
   * @param {string} httpRequest.body.label - The label to validate.
   * @param {string} httpRequest.body.number - The number to validate.
   * @returns {object} - The validation result.
   */
  validateUpdateSettings: (httpRequest) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      slug: Joi.string().required(),
      label: Joi.string().required(),
      number: Joi.string().required()
    });
    return schema.validate(httpRequest.body, options);
  },
  validateListSettings: (httpRequest) => {
    const schema = Joi.object({
    });
    return schema.validate(httpRequest.body, options);
  },
  validateViewSettings: (httpRequest) => {
    const schema = Joi.object({
    });
    return schema.validate(httpRequest.body, options);
  },
  validateDeleteSettings: (httpRequest) => {
    const schema = Joi.object({
      id: Joi.string().required()
    });
    return schema.validate(httpRequest.body, options);
  },
  validateAddSettings: (httpRequest) => {
    const schema = Joi.object({
      slug: Joi.string().required(),
      label: Joi.string().required(),
      number: Joi.string().required()
    });
    return schema.validate(httpRequest.body, options);
  },
  validateMailerUpdateSettings: (httpRequest) => {
    const schema = Joi.object({
      emailId: Joi.string().required(),
      password: Joi.string().required()
    });
    return schema.validate(httpRequest.body, options);
  }
};
