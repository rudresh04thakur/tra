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
  validateUpdateAr: (httpRequest) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      roleSlug: Joi.string().required(),
      priority: Joi.string().required(),
    });
    return schema.validate(httpRequest.body, options);
  },
  validateListAr: (httpRequest) => {
    const schema = Joi.object({
    });
    return schema.validate(httpRequest.body, options);
  },
  validateViewAr: (httpRequest) => {
    const schema = Joi.object({
    });
    return schema.validate(httpRequest.body, options);
  },
  validateDeleteAr: (httpRequest) => {
    const schema = Joi.object({
      id: Joi.string().required()
    });
    return schema.validate(httpRequest.body, options);
  },
  validateAddAr: (httpRequest) => {
    const schema = Joi.object({
      roleSlug: Joi.string().required(),
      priority: Joi.string().required(),
    });
    return schema.validate(httpRequest.body, options);
  },
};
