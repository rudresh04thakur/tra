const AuthService = require('./auth.service');
const helper = require('../../utils/helper');

const AuthController = {
  /**
   * Handle logging in user.
   * @async
   * @function
   * @param {ExpressRequest} httpRequest incoming http request
   * @param {ExpressResponse} httpResponse incoming http response
   * @returns {Promise.<ControllerResponse> }
   */
  login: async (httpRequest) => {
    const loginData = await AuthService.doLogin(httpRequest.body);

    if (loginData.status == 200) {
      httpRequest.headers.Authorization = loginData.data.accessToken;
      httpRequest.session.profile = loginData.data;
      httpRequest.session.toaster = { type: 'success', title: 'Success', message: 'Login successfully. Welcome to SSAI Travel portal' };
      if (loginData.role == 'admin') {
        return { returnType: 'redirect', path: '/request/list' }
      } else {
        return { returnType: 'redirect', path: '/request' }
      }
    } else {
      httpRequest.session.toaster = { type: 'error', title: 'Error', message: 'Please check login details' };
      return { returnType: 'render', path: 'login' }
    }
    // return helper.generateResponse(loginData);
  },
  oktaLogin: async (httpRequest) => {
    const loginData = await AuthService.doOktaLogin(httpRequest.body);
    console.log("test okta controller");
    return { returnType: 'render', path: 'login' };
  },
  register: async (httpRequest) => {
    const registerData = await AuthService.doRegistration(httpRequest.body);
    if (typeof registerData != 'undefined') {
      if (registerData.status == 200) {
        httpRequest.session.toaster = { type: 'success', title: 'Success', message: 'Registration successfully. please login to SSAI Travel portal' };
        return { returnType: 'redirect', path: '/login' }
      } else {
        httpRequest.session.toaster = { type: 'error', title: 'Error', message: 'Please check with admin' };
        return { returnType: 'render', path: 'registration' }
      }
    } else {
      httpRequest.session.toaster = { type: 'error', title: 'Error', message: 'Please check with admin' };
      return { returnType: 'render', path: 'registration' }
    }

    //return helper.generateResponse(registerData);
  },
  resetPassword: async (httpRequest) => {
    const passwordData = await AuthService.resetPassword({
      password: helper.generatePassword(),
      ...httpRequest.body
    });
    return helper.generateResponse(passwordData);
  },
  logout: async (httpRequest) => {
    await AuthService.doLogout(httpRequest);
    return { returnType: 'redirect', path: '/login' };
  },
};

module.exports = AuthController;
