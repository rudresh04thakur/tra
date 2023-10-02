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
      phone: Joi.string().min(10).max(10).allow(null, ''),
      employeeCode: Joi.string().allow(null, ''),
      contractNumber: Joi.string().allow(null, ''),
      charge: Joi.string(),
      virtualPersonalEvent: Joi.string(),
      tripJustification: Joi.string(),
      tripOrganization: Joi.string(),
      travelFrom: Joi.any(),
      travelTo: Joi.any(),
      workDestination: Joi.any(),
      travelDate: Joi.any(),
      numberOfDays: Joi.any(),
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
      airfareTrainAmount: Joi.string(),
      airfareTrainDays: Joi.string(),
      airfareTrainTotal: Joi.string(),
      lodgingAmount: Joi.string(),
      lodgingDays: Joi.string(),
      lodgingTotal: Joi.string(),
      mieAmount: Joi.string(),
      mieDays: Joi.string(),
      mieTotal: Joi.string(),
      conferenceAmount: Joi.string(),
      conferenceDays: Joi.string(),
      conferenceTotal: Joi.string(),
      automobileRentalAmount: Joi.string(),
      automobileRentalDays: Joi.string(),
      automobileRentalTotal: Joi.string(),
      allTravelTotal: Joi.string(),
      rentalCar: Joi.string(),
      pvtVehicle: Joi.string(),
      train: Joi.string(),
      milageAmount: Joi.string(),
      milageDays: Joi.string(),
      milageTotal: Joi.string(),
      createdBy: Joi.string(),
      approvedBy: Joi.string().allow(null, ''),
      approverRole: Joi.string(),
      remark: Joi.string().allow(null, ''),
      fieldwork: Joi.string()
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
      fname: Joi.string().allow(null, ''),
      lname: Joi.string().allow(null, '')
    });
    return schema.validate(httpRequest.body, options);
  },
  validateApprove: (httpRequest) => {
    const schema = Joi.object({
      id: Joi.string().allow(null, ''),
      approverEId: Joi.string().allow(null, ''),
      approverRole: Joi.string().allow(null, ''),
      approverName: Joi.string().allow(null, ''),
      actionDate: Joi.string().allow(null, ''),
      approverEmail: Joi.string().allow(null, ''),
      remark: Joi.string().allow(null, ''),
      approveStatus: Joi.string().allow(null, ''),
      approveLabel: Joi.string().allow(null, ''),
    });
    return schema.validate(httpRequest.body, options);
  }
};
