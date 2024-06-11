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
      httpRequest.toastr.success("Login successfully. Welcome to SSAI Travel portal", "Successfully logged in.");
      if (loginData.role == 'admin') {
        return { returnType: 'redirect', path: '/request/list' }
      } else {
        return { returnType: 'redirect', path: '/request' }
      }
    } else {
      httpRequest.toastr.error("Please check login details", 'Error in login.');
      return { returnType: 'redirect', path: '/login' }
    }
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
        httpRequest.toastr.success("Registration successfully and password sent on mail. please login to SSAI Travel portal", "Successfully Registered.");
       return { returnType: 'redirect', path: '/login' }
      } else {
        httpRequest.toastr.error("Registration is failed please check with admin", "Registration failed.");
        return { returnType: 'render', path: 'registration' }
      }
    } else {
      httpRequest.toastr.error("Registration is failed please check with admin", "Registration failed.");
      return { returnType: 'render', path: 'registration' }
    }
  },
  resetPassword: async (httpRequest) => {
    const passwordData = await AuthService.resetPassword({
      password: helper.generatePassword(),
      ...httpRequest.body
    });
    httpRequest.toastr.success("Password reset successfully and password sent on mail. please login to SSAI Travel portal", "Successfully reset.");
    return { returnType: 'redirect', path: '/login' }
  },
  logout: async (httpRequest) => {
    const logoutData = await AuthService.doLogout(httpRequest);
    //httpRequest.toastr.success("Logout successfully.", "Successfully logout.");
    return { returnType: 'redirect', path: '/login' };
  },
};

module.exports = AuthController;
