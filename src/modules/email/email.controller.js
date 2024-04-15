const EmailService = require('./email.service');
const helper = require('../../utils/helper');

const EmailController = {
  /**
   * Handle logging in user.
   * @async
   * @function
   * @param {ExpressRequest} httpRequest incoming http request
   * @param {ExpressResponse} httpResponse incoming http response
   * @returns {Promise.<ControllerResponse> }
   */
  update: async (httpRequest) => {
    const emailData = await EmailService.doUpdateEmail({
      ...httpRequest.body
    });
    return { returnType: 'redirect', path: 'list' }
  },
  list: async (httpRequest) => {
    const emailList = await EmailService.doListEmail({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'email-list', options: { emails: emailList.data } }
  },
  view: async (httpRequest) => {
    const email = await EmailService.doViewEmail({
      ...httpRequest.params
    });
    return helper.generateResponse(email);
  },
  edit: async (httpRequest) => {
    const email = await EmailService.doEditEmail({
      ...httpRequest.params
    });
    return { returnType: 'render', path: 'email-update', options: { email: email.data } }
    //return helper.generateResponse(userList);
  },
  delete: async (httpRequest) => {
    const email = await EmailService.doDeleteEmail({
      ...httpRequest.body
    });
    return { returnType: 'redirect', path: 'list' }
  },
  getAdd:  async (httpRequest) => {
    return { returnType: 'render', path: 'email-add'}
  },
  send:  async (httpRequest) => {
    return { returnType: 'render', path: 'email-send'}
  },
  add:  async (httpRequest) => {
    const email = await EmailService.doAddEmail({
      ...httpRequest.body
    });
    return { returnType: 'redirect', path: 'list'}
  },
  sendMail:  async (httpRequest) => {
    const email = await EmailService.sendMail({
      ...httpRequest.body
    });
    return { returnType: 'redirect', path: '/email/send'}
  },

};

module.exports = EmailController;
