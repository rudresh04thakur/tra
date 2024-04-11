const { isArray } = require('lodash');
const ModuleToRole = require('../../db/models/ModuleToRole');
const { NotFoundError } = require('../../utils/api-errors');
const ModuleToRoleService = {
  /**
   * Logs in a user and generates a token.
   * @async
   * @function
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} If the user is not found.
   */
  doUpdateMtr: async (requestBody) => {
    const { id, roleSlug, tabs, modules } = requestBody;

    ModuleToRole.updateOne({ _id: id }, {
      roleSlug: roleSlug,
      tabs: tabs,
      modules: modules
    }).then(function (data) {
      return { status: 200, data: data};
    }).catch(function (err) {
      return {status: 404, data: err};
      //throw new NotFoundError('Error while update : ' + err);
    });
  },
  doListMtr: async (requestBody) => {
    const role = await ModuleToRole.find().exec();
    if (!role) {
      return {status: 404, data: 'module to user not found in list'};
      //throw new NotFoundError('module to User not found in list');
    }
    return { status: 200, data: role};
  },
  doViewMtr: async (requestBody) => {
    const { id } = requestBody;
    const role = await ModuleToRole.findOne({ _id: id }).exec();
    if (!role) {
      return {status: 404, data: 'user not found in view'};
      //throw new NotFoundError('User not found in view');
    }
    return { status: 200, data: role};
  },
  doEditMtr: async (requestParam) => {
    const { id } = requestParam;
    const role = await ModuleToRole.findOne({ _id: id }).exec();
    if (!role) {
      return {status: 404, data: 'user not found in view'};
      //throw new NotFoundError('User not found in view');
    }
    return { status: 200, data: role};
  },
  doDeleteMtr: async (requestBody) => {
    const { id } = requestBody;
    const role = await ModuleToRole.deleteOne({ _id: id });
    if (!role) {
      return {status: 404, data: 'user not found in view'};
      //throw new NotFoundError('User not found in view');
    }
    return { status: 200, data: role};
  },
  doAddMtr: async (requestBody) => {
    const { roleSlug, tabs, modules } = requestBody;
    const role = await new ModuleToRole();
    if (isArray(tabs)) {
      for (let i = 0; i < tabs.length; i++) {
        role.tabs.push(tabs[i]);
      }
    }else{
      role.tabs = tabs;
    }
    if (isArray(modules)) {
      for (let i = 0; i < modules.length; i++) {
        role.modules.push(modules[i]);
      }
    }else{
      role.modules = modules;
    }
    role.roleSlug = roleSlug;
    role.save().then(function (data) {
      return { status: 200, data: data};
    }).catch(function (err) {
      return {status: 404, data: err};
      //throw new NotFoundError('Error while save modules to role : ' + err);
    });
  },
};

module.exports = ModuleToRoleService;
