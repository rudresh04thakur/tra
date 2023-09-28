const RoleService = require('./role.service');
const helper = require('../../utils/helper');

const RoleController = {
  /**
   * Handle logging in user.
   * @async
   * @function
   * @param {ExpressRequest} httpRequest incoming http request
   * @param {ExpressResponse} httpResponse incoming http response
   * @returns {Promise.<ControllerResponse> }
   */
  update: async (httpRequest) => {
    const roleData = await RoleService.doUpdateRole({
      ...httpRequest.body
    });
    return { returnType: 'redirect', path: 'list' }
  },
  list: async (httpRequest) => {
    const roleList = await RoleService.doListRole({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'role-list', options: { roles: roleList } }
  },
  view: async (httpRequest) => {
    const role = await RoleService.doViewRole({
      ...httpRequest.params
    });
    return helper.generateResponse(role);
  },
  edit: async (httpRequest) => {
    const role = await RoleService.doEditRole({
      ...httpRequest.params
    });
    return { returnType: 'render', path: 'role-update', options: { role: role } }
    //return helper.generateResponse(userList);
  },
  delete: async (httpRequest) => {
    const role = await RoleService.doDeleteRole({
      ...httpRequest.body
    });
    return { returnType: 'redirect', path: 'list' }
  },
  getAdd:  async (httpRequest) => {
    return { returnType: 'render', path: 'role-add'}
  },
  add:  async (httpRequest) => {
    const role = await RoleService.doAddRole({
      ...httpRequest.body
    });
    return { returnType: 'redirect', path: 'list'}
  },

};

module.exports = RoleController;
