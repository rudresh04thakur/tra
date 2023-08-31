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
   * @returns {object} - The validation result.
   */
  validateRequest: (httpRequest) => {
    const schema = Joi.object({
      fname: Joi.string().min(3).max(30).required(),
      lname: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .pattern(/\S+@\S+\.\S+/)
        .required()
        .messages({
          'string.pattern.base': 'Provide valid email!',
        }),
      phone: Joi.string().min(10).max(10).allow(null,''),
      employeeCode: Joi.string().allow(null, ''),
      contractNumber: Joi.string().allow(null,''),
      charge: Joi.string(),
      virtualevent: Joi.string(),
      tripJustification: Joi.string(),
      tripOrganization: Joi.string(),
      travelFrom: Joi.string(),
      travelTo: Joi.string(),
      workDestination: Joi.string(),
      travelDate: Joi.string(),
      numberOfDays: Joi.string(),
      numberOfVacation: Joi.string(),
      foreignTrip: Joi.string(),
      itAsset: Joi.string(),
      airlinereservation: Joi.string(),
      hotelreservation: Joi.string(),
      conferenceregistration: Joi.string(),
      conferenceregistrationfee: Joi.string(),
      requestcash: Joi.string().allow(null, ''),
      estimatecost: Joi.string().allow(null, ''),
      registerNcts: Joi.string().allow(null, ''),
      nctsEmail: Joi.string().allow(null, ''),
      approverName: Joi.string(),
      requestApprovalDate: Joi.string(),
      groupleader: Joi.string(),
      programmanagesDate: Joi.string(),
      customerconference: Joi.string(),
      customerconferenceDate: Joi.string(),
      corDate: Joi.string(),
      travelcordinatorDate: Joi.string(),
      AirfareTrainAmount: Joi.string(),
      AirfareTrainDays: Joi.string(),
      AirfareTrainTotal: Joi.string(),
      LodgingAmount: Joi.string(),
      LodgingDays: Joi.string(),
      LodgingTotal: Joi.string(),
      MieAmount: Joi.string(),
      MieDays: Joi.string(),
      MieTotal: Joi.string(),
      ConferenceAmount: Joi.string(),
      ConferenceDays: Joi.string(),
      ConferenceTotal: Joi.string(),
      AutomobileRentalAmount: Joi.string(),
      AutomobileRentalDays: Joi.string(),
      AutomobileRentalTotal: Joi.string(),
      allTravelTotal: Joi.string()
    });
    return schema.validate(httpRequest.body, options);
  },
  validatePlace: (httpRequest) => {
    const schema = Joi.object({
    });
    return schema.validate(httpRequest.body, options);
  },
  validateEid: (httpRequest) => {
    const schema = Joi.object({
      eid: Joi.string().required(),
    });
    return schema.validate(httpRequest.body, options);
  },
  validateFname: (httpRequest) => {
    const schema = Joi.object({
      fname: Joi.string().required(),
    });
    return schema.validate(httpRequest.body, options);
  },
  validateLname: (httpRequest) => {
    const schema = Joi.object({
      lname: Joi.string().required(),
    });
    return schema.validate(httpRequest.body, options);
  },
  validateListName: (httpRequest) => {
    const schema = Joi.object({
      fname: Joi.string().allow(null,''),
      lname: Joi.string().allow(null,'')
    });
    return schema.validate(httpRequest.body, options);
  }
};
