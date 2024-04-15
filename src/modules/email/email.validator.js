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
  validateUpdateEmail: (httpRequest) => {
    const schema = Joi.object({
      id: Joi.string().required(),
      templateName: Joi.string().required(),
      title: Joi.string().required(),
      subject: Joi.string().required(),
      html: Joi.string().required(),
    });
    return schema.validate(httpRequest.body, options);
  },
  validateListEmail: (httpRequest) => {
    const schema = Joi.object({
    });
    return schema.validate(httpRequest.body, options);
  },
  validateViewEmail: (httpRequest) => {
    const schema = Joi.object({
    });
    return schema.validate(httpRequest.body, options);
  },
  validateDeleteEmail: (httpRequest) => {
    const schema = Joi.object({
      id: Joi.string().required()
    });
    return schema.validate(httpRequest.body, options);
  },
  validateAddEmail: (httpRequest) => {
    const schema = Joi.object({
      templateName: Joi.string().required(),
      title: Joi.string().required(),
      subject: Joi.string().required(),
      html: Joi.string().required(),
    });
    return schema.validate(httpRequest.body, options);
  },
};
