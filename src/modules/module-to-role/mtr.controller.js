const ModuleToRoleService = require('./mtr.service');
const helper = require('../../utils/helper');
const RoleService = require('../roles/role.service');
const ModuleToRoleController = {
  /**
   * Handle logging in user.
   * @async
   * @function
   * @param {ExpressRequest} httpRequest incoming http request
   * @param {ExpressResponse} httpResponse incoming http response
   * @returns {Promise.<ControllerResponse> }
   */
  update: async (httpRequest) => {
    const mtrData = await ModuleToRoleService.doUpdateMtr({
      ...httpRequest.body
    });
    if(mtrData.status == 200){
      httpRequest.toastr.success("Module role updated successfully", "Update successfully" );
    }else{
      httpRequest.toastr.error("Module role not updated","Error in update");
    }
    return { returnType: 'redirect', path: 'list' }
  },
  list: async (httpRequest) => {
    const roleList = await ModuleToRoleService.doListMtr({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'mtr-list', options: { data: roleList.data } }
  },
  view: async (httpRequest) => {
    const role = await ModuleToRoleService.doViewMtr({
      ...httpRequest.params
    });
    return helper.generateResponse(role);
  },
  edit: async (httpRequest) => {
    const roles = await RoleService.doListRole({
      ...httpRequest.body
    });
    const mtrRole = await ModuleToRoleService.doEditMtr({
      ...httpRequest.params
    });
    return { returnType: 'render', path: 'mtr-update', options: { mtrData: mtrRole.data,data: roles.data } }
    //return helper.generateResponse(userList);
  },
  delete: async (httpRequest) => {
    const role = await ModuleToRoleService.doDeleteMtr({
      ...httpRequest.body
    });
    if(role.status == 200){
      httpRequest.toastr.success("Module role deleted successfully", "Deleted successfully" );
    }else{
      httpRequest.toastr.error("Module role not deleted","Error in deleted");
    }
    return { returnType: 'redirect', path: 'list' }
  },
  getAdd:  async (httpRequest) => {
    const roles = await RoleService.doListRole({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'mtr-add', options: {data:roles.data}}
  },
  add:  async (httpRequest) => {
    const mtr = await ModuleToRoleService.doAddMtr({
      ...httpRequest.body
    });
    if(mtr.status == 200){
      httpRequest.toastr.success("Module role added successfully", "Add successfully" );
    }else{
      httpRequest.toastr.error("Module role not added","Error in add");
    }
    return { returnType: 'redirect', path: 'list'}
  },

};

module.exports = ModuleToRoleController;
