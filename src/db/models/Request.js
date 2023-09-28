/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const { string } = require('yargs');
// define the User model schema
const ApproversSchema = new mongoose.Schema({
  approverName:
  {
    type: String
  },
  approverEId: {
    type: String
  },
  approveStatus: {
    type: String,
    default: false
  },
  actionDate:{
    type: String
  },
  remark: {
    type: String
  }
})
const RequestSchema = new mongoose.Schema({

  fname: {
    type: String
  },
  lname: {
    type: String
  },
  employeeCode: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  contractNumber: {
    type: String
  },
  charge: {
    type: String
  },
  virtualPersonalEvent: {
    type: String
  },
  tripJustification: {
    type: String
  },
  tripOrganization: {
    type: String
  },

  travelFrom: [{
    type: String
  }],
  travelTo: [{
    type: String
  }],
  workDestination: [{
    type: String
  }],
  travelDate: [{
    type: String
  }],
  numberOfDays: [{
    type: String
  }],
  numberOfVacation: {
    type: String
  },

  foreignTrip: {
    type: String
  },
  itAsset: {
    type: String
  },
  airlinereservation: {
    type: String
  },
  hotelreservation: {
    type: String
  },
  conferenceregistration: {
    type: String
  },
  conferenceregistrationfee: {
    type: String
  },
  requestcash: {
    type: String
  },
  estimatecost: {
    type: String
  },
  registerNcts: {
    type: String
  },
  nctsEmail: {
    type: String
  },
  groupleader: {
    type: String
  },
  programmanagesDate: {
    type: String
  },
  customerconference: {
    type: String
  },
  customerconferenceDate: {
    type: String
  },
  corDate: {
    type: String
  },
  travelcordinatorDate: {
    type: String
  },
  airfareTrainAmount: {
    type: String
  },
  airfareTrainDays: {
    type: String
  },
  airfareTrainTotal: {
    type: String
  },
  lodgingAmount: {
    type: String
  },
  lodgingDays: {
    type: String
  },
  lodgingTotal: {
    type: String
  },
  mieAmount: {
    type: String
  },
  mieDays: {
    type: String
  },
  mieTotal: {
    type: String
  },
  conferenceAmount: {
    type: String
  },
  conferenceDays: {
    type: String
  },
  conferenceTotal: {
    type: String
  },
  automobileRentalAmount: {
    type: String
  },
  automobileRentalDays: {
    type: String
  },
  automobileRentalTotal: {
    type: String
  },
  allTravelTotal: {
    type: String
  },
  status: {
    type: String,
    default: 'pending'
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  rentalCar: {
    type: String
  },
  pvtVehicle: {
    type: String
  },
  train: {
    type: String
  },
  milageAmount: {
    type: String
  },
  milageDays: {
    type: String
  },
  milageTotal: {
    type: String
  },
  createdBy: {
    type: String
  },
  fieldwork: {
    type: String
  },
  approvers:[{
    type:ApproversSchema
  }]

}, { timestamps: true });


module.exports = mongoose.model('travelrequests', RequestSchema);