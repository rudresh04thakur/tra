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
  validateUpdateMtr: (httpRequest) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      roleSlug: Joi.string().required(),
      tabs: Joi.any(),
      modules: Joi.any(),
    });
    return schema.validate(httpRequest.body, options);
  },
  validateListMtr: (httpRequest) => {
    const schema = Joi.object({
    });
    return schema.validate(httpRequest.body, options);
  },
  validateViewMtr: (httpRequest) => {
    const schema = Joi.object({
    });
    return schema.validate(httpRequest.body, options);
  },
  validateDeleteMtr: (httpRequest) => {
    const schema = Joi.object({
      id: Joi.string().required()
    });
    return schema.validate(httpRequest.body, options);
  },
  validateAddMtr: (httpRequest) => {
    const schema = Joi.object({
      roleSlug: Joi.string().required(),
      tabs: Joi.any(),
      modules: Joi.any(),
    });
    return schema.validate(httpRequest.body, options);
  },
};
