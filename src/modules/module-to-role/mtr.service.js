const ModuleToRole  = require('../../db/models/ModuleToRole');
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
    const { id, label, number } = requestBody;
    ModuleToRole.updateOne({ _id: id }, {
      label: label,
      number: number
    }).then(function (data) {
      return data;
    }).catch(function (err) {
      throw new NotFoundError('Error while update : ' + err);
    });
  },
  doListMtr: async (requestBody) => {
    const role = await ModuleToRole.find().exec();
    if (!role) {
      throw new NotFoundError('User not found in list');
    }
    return role;
  },
  doViewMtr: async (requestBody) => {
    const { id } = requestBody;
    const role = await ModuleToRole.findOne({ _id: id }).exec();
    if (!role) {
      throw new NotFoundError('User not found in view');
    }
    return role;
  },
  doEditMtr: async (requestParam) => {
    const { id } = requestParam;
    const role = await ModuleToRole.findOne({ _id: id }).exec();
    if (!role) {
      throw new NotFoundError('User not found in view');
    }
    return role;
  },
  doDeleteMtr: async (requestBody) => {
    const { id } = requestBody;
    const role = await ModuleToRole.deleteOne({_id: id});
    if (!role) {
      throw new NotFoundError('User not found in view');
    }
    return role;
  },
  doAddMtr: async (requestBody) => {
    const { label, number, slug } = requestBody;
    const role = await new ModuleToRole();
    role.label = label;
    role.number = number;
    role.slug = slug.toLowerCase().replace(/ /g,"-");
    role.save().then(function(data){
      return data;
    }).catch(function(err){
      throw new NotFoundError('Error while save role : ' + err);
    });
  },
};

module.exports = ModuleToRoleService;
