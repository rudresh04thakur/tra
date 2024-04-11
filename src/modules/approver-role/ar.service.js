const { isArray } = require('lodash');
const ApproverRole = require('../../db/models/ApproverRole');
const { NotFoundError } = require('../../utils/api-errors');
const ApproverRoleService = {
  /**
   * Logs in a user and generates a token.
   * @async
   * @function
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} If the user is not found.
   */
  doUpdateAr: async (requestBody) => {
    const { id, roleSlug, priority } = requestBody;

    ApproverRole.updateOne({ _id: id }, {
      roleSlug: roleSlug,
      priority: priority,
    }).then(function (data) {
      return { status: 200, data: data};
    }).catch(function (err) {
      return {status: 404, data: err};
      //throw new NotFoundError('Error while update : ' + err);
    });
  },
  doListAr: async (requestBody) => {
    const role = await ApproverRole.find().exec();
    if (!role) {
      return {status: 404, data: 'Module to user not fount in list'};
      //throw new NotFoundError('module to User not found in list');
    }
    return { status: 200, data: role};
  },
  doViewAr: async (requestBody) => {
    const { id } = requestBody;
    const role = await ApproverRole.findOne({ _id: id }).exec();
    if (!role) {
      return {status: 404, data: 'user not fount in view'};
      //throw new NotFoundError('User not found in view');
    }
    return { status: 200, data: role};
  },
  doEditAr: async (requestParam) => {
    const { id } = requestParam;
    const role = await ApproverRole.findOne({ _id: id }).exec();
    if (!role) {
      return {status: 404, data: 'user not fount in view'};
      //throw new NotFoundError('User not found in view');
    }
    return { status: 200, data: role};
  },
  doDeleteAr: async (requestBody) => {
    const { id } = requestBody;
    const role = await ApproverRole.deleteOne({ _id: id });
    if (!role) {
      return {status: 404, data: 'user not found in view'};
      //throw new NotFoundError('User not found in view');
    }
    return { status: 200, data: role};
  },
  doAddAr: async (requestBody) => {
    const { roleSlug, priority } = requestBody;
    const role = await new ApproverRole();
    role.priority = priority;
    role.roleSlug = roleSlug;
    role.save().then(function (data) {
      return { status: 200, data: data};
    }).catch(function (err) {
      return {status: 404, data: err};
      //throw new NotFoundError('Error while save modules to priority role : ' + err);
    });
  },
};

module.exports = ApproverRoleService;
