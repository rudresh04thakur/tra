const UserService = require('./user.service');
const RoleService = require('../roles/role.service');
const helper = require('../../utils/helper');
const fs = require('fs');
const yaml = require('js-yaml');

const UserController = {
  /**
   * Handle logging in user.
   * @async
   * @function
   * @param {ExpressRequest} httpRequest incoming http request
   * @param {ExpressResponse} httpResponse incoming http response
   * @returns {Promise.<ControllerResponse> }
   */
  update: async (httpRequest) => {
    const userData = await UserService.doUpdateUser({
      ...httpRequest.body
    });
    if(userData.status == 200){
      httpRequest.toastr.success("User updated successfully", "Update successfully" );
    }else{
      httpRequest.toastr.success("User not updated","Error in update");
    }
    return { returnType: 'redirect', path: 'list' }
  },
  list: async (httpRequest) => {
    const userList = await UserService.doListUser({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'list', options: { users: userList.data, roles: helper.getUserRoleLabel()  } }
  },
  view: async (httpRequest) => {
    const user = await UserService.doViewUser({
      ...httpRequest.params
    });
    return helper.generateResponse(user);
  },
  edit: async (httpRequest) => {
    const user = await UserService.doEditUser({
      ...httpRequest.params
    });
    const roles = await RoleService.doListRole({
      ...httpRequest
    });
    return { returnType: 'render', path: 'update', options: { user: user.data, roles: roles.data } }
  },
  delete: async (httpRequest) => {
    const userData = await UserService.doDeleteUser({
      ...httpRequest.body
    });
    if(userData.status == 200){
      httpRequest.toastr.success("User deleted successfully", "Delete successfully" );
    }else{
      httpRequest.toastr.success("User not deleted","Error in delete");
    }
    return { returnType: 'redirect', path: 'list' }
  },
  addPost: async (httpRequest) => {
    const userData = await UserService.doAddUser({
      ...httpRequest.body
    });
    if(userData.status == 200){
      httpRequest.toastr.success("User added successfully", "Add successfully" );
    }else{
      httpRequest.toastr.success("User not added","Error in add");
    }
    return { returnType: 'redirect', path: 'list' };
  },
  add: async (httpRequest) => {
    const roles = await RoleService.doListRole({
      ...httpRequest
    });
    return { returnType: 'render', path: 'add', options:{ roles: roles.data }}
  },
  addUserByYaml: async (httpRequest) => {
    const userList = await UserService.doAddUserFromYaml({
      fileName: httpRequest.file.filename
    });
    return { returnType: 'redirect', path: 'list'}
  },
  exportUserToYaml: async (httpRequest) => {
    const userList = await UserService.doListUser({
      ...httpRequest.body
    });
    let yamlStr = yaml.dump(userList);
    fs.writeFileSync('D:/sevenmentor/travelportal_final/src/public/database/users.yaml', yamlStr, 'utf8');
    return { returnType: 'download', path: '', data: userList.data}
  }
};

module.exports = UserController;
