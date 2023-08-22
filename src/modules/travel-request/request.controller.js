const RequestService = require('./request.service');
const helper = require('../../utils/helper');

const RequestController = {
  /**
   * Handle logging in user.
   * @async
   * @function
   * @param {ExpressRequest} httpRequest incoming http request
   * @returns {Promise.<ControllerResponse> }
   */
  travelRequest: async (httpRequest) => {
    const travelData = await RequestService.travelRequest(httpRequest.body);
    return helper.generateResponse(travelData);
  },
  getPlaceFromGoogle: async (httpRequest) => {
    const placeDetails = await RequestService.getPlaceFromGoogle(httpRequest.body);
    return helper.generateResponse(placeDetails);
  },
  getRequestDetailsOnEid: async (httpRequest) => {
    const requestDetails = await RequestService.getRequestDetailsOnEid(httpRequest.body);
    return helper.generateResponse(requestDetails);
  },
  getRequestListOfName: async (httpRequest) => {
    const requestList = await RequestService.getListOfName(httpRequest.body);
    return helper.generateResponse(requestList);
  },
  getRequestDetailsOnFname: async (httpRequest) => {
    const requestDetails = await RequestService.getRequestDetailsOnFname(httpRequest.body);
    return helper.generateResponse(requestDetails);
  },
  getRequestDetailsOnLname: async (httpRequest) => {
    const requestDetails = await RequestService.getRequestDetailsOnLname(httpRequest.body);
    return helper.generateResponse(requestDetails);
  },

  list: async (httpRequest) => {
    const requestList = await RequestService.doListRequest({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'request-list', options: { requests: requestList, roles: helper.getUserRoleLabel()  } }
  },
};

module.exports = RequestController;
