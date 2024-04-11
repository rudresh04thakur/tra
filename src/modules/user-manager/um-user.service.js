const UM = require('../../db/models/Um');
const User = require('../../db/models/User');
const { NotFoundError } = require('../../utils/api-errors');
const UMService = {
  /**
   * Logs in a UM and generates a token.
   * @async
   * @function
   * @param {UMDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} If the UM is not found.
   */
  doAddUserGet: async (requestBody) => {
    const user = await User.find().exec();
    if (!user) {
      return {status: 404, data: 'user not found in um add'};
      //throw new NotFoundError('user not found in um add');
    }
    return { status: 200, data: user};
  },
  doUpdateUM: async (requestBody) => {
    const { id, employee_email, pm_email, tm_email, gl_email, tc_email } = requestBody;
    UM.updateOne({ _id: id }, {
      employee_email: employee_email,
      pm_email: pm_email,
      tm_email: tm_email,
      gl_email: gl_email,
      tc_email: tc_email,
    }).then(function (data) {
      return { status: 200, data: data};
    }).catch(function (err) {
      return {status: 404, data: err};
      //throw new NotFoundError('Error while update : ' + err);
    });
  },
  doAddUM: async (requestBody) => {
    const { employee_email, pm_email, tm_email, gl_email, tc_email } = requestBody;
    const um = await new UM();
    um.employee_email = employee_email;
    um.pm_email = pm_email;
    um.tm_email = tm_email;
    um.gl_email = gl_email;
    um.tc_email = tc_email;
    um.save().then(function (data) {
      return { status: 200, data: data};
    }).catch(function (err) {
      return {status: 404, data: err};
      //throw new NotFoundError('Error while save um : ' + err);
    });
  },
  doListUM: async (requestBody) => {
    const um = await UM.find().exec();
    if (!um) {
      return {status: 404, data: 'um not found in view'};
      //throw new NotFoundError('UM not found in list');
    }
    return { status: 200, data: um};
  },
  doViewUM: async (requestBody) => {
    const { id } = requestBody;
    const um = await UM.findOne({ _id: id }).exec();
    if (!um) {
      return {status: 404, data: 'um not found in view'};
      //throw new NotFoundError('UM not found in view');
    }
    return { status: 200, data: um};
  },
  doEditUM: async (requestParam) => {
    const { id } = requestParam;
    const um = await UM.findOne({ _id: id }).exec();
    if (!um) {
      return {status: 404, data: 'um not found in view'};
      //throw new NotFoundError('UM not found in view');
    }

    const user = await User.find().exec();
    if (!user) {
      return {status: 404, data: 'user not found in um add'};
      //throw new NotFoundError('user not found in um add');
    }
    return {user:user,eData:um};
  },
  doDeleteUM: async (requestBody) => {
    const { id } = requestBody;
    const um = await UM.deleteOne({ _id: id });
    if (!um) {
      return {status: 404, data: 'UM not found in view'};
      //throw new NotFoundError('UM not found in view');
    }
    return { status: 200, data: um};
  }
};

module.exports = UMService;
