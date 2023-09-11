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
    await UMService.doUpdateUser({
      ...httpRequest.body
    });
    return { returnType: 'redirect', path: 'list' }
  },
  list: async (httpRequest) => {
    const umList = await UMService.doListUser({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'um-list', options: { umList: umList } }
  },
  view: async (httpRequest) => {
    const um = await UMService.doViewUser({
      ...httpRequest.params
    });
    return helper.generateResponse(um);
  },
  edit: async (httpRequest) => {
    const um = await UMService.doEditUser({
      ...httpRequest.params
    });
    return { returnType: 'render', path: 'um-update', options: { user: um } }
  },
  delete: async (httpRequest) => {
    await UMService.doDeleteUser({
      ...httpRequest.params
    });
    return { returnType: 'redirect', path: 'list' }
  },
  addPost: async (httpRequest) => {
    const user = await UMService.doAddUser({
      ...httpRequest.body
    });
    return { returnType: 'redirect', path: 'list' };
  },
  add: async (httpRequest) => {
    const data = await UMService.doAddUserGet({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'um-add' , options: { data: data}}
  }
};

module.exports = UMController;
