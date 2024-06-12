const RequestService = require('./request.service');
const helper = require('../../utils/helper');
const moment = require('moment');
const RequestController = {
  /**
   * Handle logging in user.
   * @async
   * @function
   * @param {ExpressRequest} httpRequest incoming http request
   * @returns {Promise.<ControllerResponse> }
   */

  travel: async (httpRequest) => {
    return { returnType: 'render', path: 'requestform', options: { minDate: moment().format('YYYY-MM-DD') } }
  },

  travelEdit: async (httpRequest) => {
    const travelData = await RequestService.travelEdit(httpRequest.params);
    return { returnType: 'render', path: 'request-update', options: { minDate: moment().format('YYYY-MM-DD'), data: travelData.data} }
  },

  travelView: async (httpRequest) => {
    const travelData = await RequestService.travelView(httpRequest);
    return { returnType: 'render', path: 'request-view', options: { minDate: moment().format('YYYY-MM-DD'), data: travelData} }
  },

  travelApprove: async (httpRequest) => {
    const travelData = await RequestService.travelApprove(httpRequest);
    return { returnType: 'render', path: 'request-approve', options: { minDate: moment().format('YYYY-MM-DD'), data: travelData} }
  },

  travelPostApprove: async (httpRequest) => {
    const travelData = await RequestService.travelPostApprove(httpRequest);
    if(travelData.status == 200){
      httpRequest.toastr.success("Travel request approved", "Approve successfully" );
    }else{
      httpRequest.toastr.success("Travel request not approved","Error in approve");
    }
    return { returnType: 'redirect', path: 'list'}
  },

  travelPostReject: async (httpRequest) => {
    const travelData = await RequestService.travelPostReject(httpRequest);
    if(travelData.status == 200){
      httpRequest.toastr.success("Travel request rejected", "Reject successfully" );
    }else{
      httpRequest.toastr.success("Travel request not rejected","Error in reject");
    }
    return { returnType: 'redirect', path: 'list'}
  },

  travelUpdate: async (httpRequest) => {
    const travelData = await RequestService.travelUpdate(httpRequest.body);
    return { returnType: 'render', path: 'requestform', options: { minDate: moment().format('YYYY-MM-DD') } }
  },

  travelRequest: async (httpRequest) => {
    const travelData = await RequestService.travelRequest(httpRequest);
    if(travelData.status == 200){
      httpRequest.toastr.success("Travel request created", "Create successfully" );
    }else{
      httpRequest.toastr.success("Travel request not created","Error in create");
    }
    return { returnType: 'redirect', path: 'list'}
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
      ...httpRequest
    });
    return { returnType: 'render', path: 'request-list', options: { requests: requestList.data, roles: helper.getUserRoleLabel() } }
  },
  delete: async (httpRequest) => {
    const role = await RequestService.doDeleteRequest({
      ...httpRequest.body
    });
    if(travelData.status == 200){
      httpRequest.toastr.success("Travel request deleted", "Delete successfully" );
    }else{
      httpRequest.toastr.success("Travel request not deleted","Error in delete");
    }
    return { returnType: 'redirect', path: 'list' }
  },
};

module.exports = RequestController;
