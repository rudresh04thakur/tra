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
    await UMService.doUpdateUM({
      ...httpRequest.body
    });
    return { returnType: 'redirect', path: 'list' }
  },
  list: async (httpRequest) => {
    const umList = await UMService.doListUM({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'um-list', options: { umList: umList } }
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
    return { returnType: 'render', path: 'um-update', options: { data: um.user,eData:um.eData } }
  },
  delete: async (httpRequest) => {
    await UMService.doDeleteUM({
      ...httpRequest.params
    });
    return { returnType: 'redirect', path: 'list' }
  },
  addPost: async (httpRequest) => {
    const user = await UMService.doAddUM({
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
