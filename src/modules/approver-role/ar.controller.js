const ApproverRoleService = require('./ar.service');
const helper = require('../../utils/helper');
const RoleService = require('../roles/role.service');
const ApproverRoleController = {
  /**
   * Handle logging in user.
   * @async
   * @function
   * @param {ExpressRequest} httpRequest incoming http request
   * @param {ExpressResponse} httpResponse incoming http response
   * @returns {Promise.<ControllerResponse> }
   */
  update: async (httpRequest) => {
    const updateData = await ApproverRoleService.doUpdateAr({
      ...httpRequest.body
    });
    if(updateData.status == 200){
      httpRequest.toastr.success("Approver role updated successfully", "Update successfully" );
    }else{
      httpRequest.toastr.success("Approver role not updated","Error in update");
    }
    return { returnType: 'redirect', path: 'list' }
  },
  list: async (httpRequest) => {
    const arList = await ApproverRoleService.doListAr({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'ar-list', options: { data: arList } }
  },
  view: async (httpRequest) => {
    const role = await ApproverRoleService.doViewAr({
      ...httpRequest.params
    });
    return helper.generateResponse(role);
  },
  edit: async (httpRequest) => {
    const roles = await RoleService.doListRole({
      ...httpRequest.body
    });
    const arRole = await ApproverRoleService.doEditAr({
      ...httpRequest.params
    });
    return { returnType: 'render', path: 'ar-update', options: { arData: arRole,data: roles } }
    //return helper.generateResponse(userList);
  },
  delete: async (httpRequest) => {
    const role = await ApproverRoleService.doDeleteAr({
      ...httpRequest.body
    });
    if(role.status == 200){
      httpRequest.toastr.success("Approver role deleted successfully", "Delete successfully" );
    }else{
      httpRequest.toastr.success("Approver role not deleted","Error in delete");
    }
    return { returnType: 'redirect', path: 'list' }
  },
  getAdd:  async (httpRequest) => {
    const roles = await RoleService.doListRole({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'ar-add', options: {data:roles}}
  },
  add:  async (httpRequest) => {
    const ar = await ApproverRoleService.doAddAr({
      ...httpRequest.body
    });
    if(ar.status == 200){
      httpRequest.toastr.success("Approver role added successfully", "Add successfully" );
    }else{
      httpRequest.toastr.success("Approver role not added","Error in add");
    }
    return { returnType: 'redirect', path: 'list'}
  },

};

module.exports = ApproverRoleController;
