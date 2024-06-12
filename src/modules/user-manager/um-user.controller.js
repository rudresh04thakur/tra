const UMService = require('./um-user.service');
const helper = require('../../utils/helper');
const fs = require('fs');
const yaml = require('js-yaml');

const UMController = {
  /**
   * Handle logging in user.
   * @async
   * @function
   * @param {ExpressRequest} httpRequest incoming http request
   * @param {ExpressResponse} httpResponse incoming http response
   * @returns {Promise.<ControllerResponse> }
   */
  update: async (httpRequest) => {
    const userData = await UMService.doUpdateUM({
      ...httpRequest.body
    });
    if(userData.status == 200){
      httpRequest.toastr.success("Manager for user updated successfully", "Update successfully" );
    }else{
      httpRequest.toastr.error("Manager for user not updated","Error in update");
    }
    return { returnType: 'redirect', path: 'list' }
  },
  list: async (httpRequest) => {
    const umList = await UMService.doListUM({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'um-list', options: { umList: umList.data } }
  },
  view: async (httpRequest) => {
    const um = await UMService.doViewUM({
      ...httpRequest.params
    });
    return helper.generateResponse(um);
  },
  edit: async (httpRequest) => {
    const um = await UMService.doEditUM({
      ...httpRequest.params
    });
    return { returnType: 'render', path: 'um-update', options: { data: um.user.data,eData:um.eData.data } }
  },
  delete: async (httpRequest) => {
    const userData = await UMService.doDeleteUM({
      ...httpRequest.body
    });
    if(userData.status == 200){
      httpRequest.toastr.success("Manager for user deleted successfully", "Delete successfully" );
    }else{
      httpRequest.toastr.error("Manager for user not deleted","Error in delete");
    }
    return { returnType: 'redirect', path: 'list' }
  },
  addPost: async (httpRequest) => {
    const userData = await UMService.doAddUM({
      ...httpRequest.body
    });
    if(userData.status == 200){
      httpRequest.toastr.success("Manager for user added successfully", "Add successfully" );
    }else{
      httpRequest.toastr.error("Manager for user not added","Error in add");
    }
    return { returnType: 'redirect', path: 'list' };
  },
  add: async (httpRequest) => {
    const data = await UMService.doAddUserGet({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'um-add' , options: { data: data.data}}
  }
};

module.exports = UMController;
