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
      return data;
    }).catch(function (err) {
      throw new NotFoundError('Error while update : ' + err);
    });
  },
  doListAr: async (requestBody) => {
    const role = await ApproverRole.find().exec();
    if (!role) {
      throw new NotFoundError('module to User not found in list');
    }
    return role;
  },
  doViewAr: async (requestBody) => {
    const { id } = requestBody;
    const role = await ApproverRole.findOne({ _id: id }).exec();
    if (!role) {
      throw new NotFoundError('User not found in view');
    }
    return role;
  },
  doEditAr: async (requestParam) => {
    const { id } = requestParam;
    const role = await ApproverRole.findOne({ _id: id }).exec();
    if (!role) {
      throw new NotFoundError('User not found in view');
    }
    return role;
  },
  doDeleteAr: async (requestBody) => {
    const { id } = requestBody;
    const role = await ApproverRole.deleteOne({ _id: id });
    if (!role) {
      throw new NotFoundError('User not found in view');
    }
    return role;
  },
  doAddAr: async (requestBody) => {
    const { roleSlug, priority } = requestBody;
    const role = await new ApproverRole();
    role.priority = priority;
    role.roleSlug = roleSlug;
    role.save().then(function (data) {
      return data;
    }).catch(function (err) {
      throw new NotFoundError('Error while save modules to priority role : ' + err);
    });
  },
};

module.exports = ApproverRoleService;
