const fs = require('fs');
const yaml = require('js-yaml');
const Role = require('../../db/models/Role');
const { ObjectId } = require('mongodb');
const { NotFoundError } = require('../../utils/api-errors');
const roleRoutes = require('./role.routes');
const RoleService = {
  /**
   * Logs in a user and generates a token.
   * @async
   * @function
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} If the user is not found.
   */
  doUpdateRole: async (requestBody) => {
    const { id, label, number } = requestBody;
    Role.updateOne({ _id: id }, {
      label: label,
      number: number
    }).then(function (data) {
      return { status: 200, data: data};
    }).catch(function (err) {
      return {status: 404, data: err};
      //throw new NotFoundError('Error while update : ' + err);
    });
  },
  doListRole: async (requestBody) => {
    const role = await Role.find().exec();
    if (!role) {
      return {status: 404, data: 'role not found in list'};
      //throw new NotFoundError('Role not found in list');
    }
    return { status: 200, data: role};
  },
  doViewRole: async (requestBody) => {
    const { id } = requestBody;
    const role = await Role.findOne({ _id: id }).exec();
    if (!role) {
      return {status: 404, data: 'role not found in view'};
      //throw new NotFoundError('Role not found in view');
    }
    return { status: 200, data: role};
  },
  doEditRole: async (requestParam) => {
    const { id } = requestParam;
    const role = await Role.findOne({ _id: id }).exec();
    if (!role) {
      return {status: 404, data: 'role not found in view'};
      //throw new NotFoundError('Role not found in view');
    }
    return { status: 200, data: role};
  },
  doDeleteRole: async (requestBody) => {
    const { id } = requestBody;
    const role = await Role.deleteOne({_id: id});
    if (!role) {
      return {status: 404, data: 'role not found in view'};
      //throw new NotFoundError('Role not found in view');
    }
    return { status: 200, data: role};
  },
  doAddRole: async (requestBody) => {
    const { label, number, slug } = requestBody;
    const role = await new Role();
    role.label = label;
    role.number = number;
    role.slug = slug.toLowerCase().replace(/ /g,"-");
    role.save().then(function(data){
      return { status: 200, data: data};
    }).catch(function(err){
      return {status: 404, data: err};
      //throw new NotFoundError('Error while save role : ' + err);
    });
  },
};

module.exports = RoleService;
