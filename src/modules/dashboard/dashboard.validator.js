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
  validateLogin: (httpRequest) => {
    const schema = Joi.object({
      email: Joi.string()
        .pattern(/\S+@\S+\.\S+/)
        .required()
        .messages({
          'string.pattern.base': 'Provide valid email!',
        }),
      password: Joi.string().min(8).max(20).alphanum().required(),
    });
    return schema.validate(httpRequest.body, options);
  },
};
