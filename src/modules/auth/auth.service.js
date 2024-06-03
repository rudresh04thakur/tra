const bcrypt = require('bcryptjs');
const User = require('../../db/models/User');
const JwtService = require('./jwt.service');
const ModuleToRole = require('../../db/models/ModuleToRole')
const TemplateSettings = require('../../db/models/TemplateSettings')
const MailerSettings = require('../../db/models/MailerSettings')
const EmailServices = require('../email/email.service')
const helper = require('../../utils/helper')
const okta = require('@okta/okta-sdk-nodejs');

const AuthService = {
  /**
   * Logs in a user and generates a token.
   * @async
   * @function
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} If the user is not found.
   */
  doLogin: async (requestBody) => {
    const { email, password } = requestBody;
    const user = await User.findOne({ email: email, password: password }).exec();
    if (!user) {
      return { status: 404, data: 'User not found' }
      //throw new NotFoundError('User not found');
    }
    // const isValidPass = bcrypt.compareSync(password, user.password);
    // if (!isValidPass) {
    //   throw new BadRequestError('Username or Password is invalid!');
    // }
    const moduleToRole = await ModuleToRole.findOne({ roleSlug: user.role }).exec();
    if (!moduleToRole) {
      console.log('assign module not found');
    }

    const payload = {
      id: user._id,
      employeeCode: user.employeeCode,
      role: user.role,
      email: user.email,
      fname: user.fname,
      lname: user.lname,
      phone: user.phone,
      moduleTabs: moduleToRole
    };

    const accessToken = await JwtService.generateJWT({
      payload,
    });
    // EmailServices.sendMail( {
    //   from: 'rudresh04thakur@gmail.com',
    //   to: user.email,
    //   subject: 'Recently login successfully, Welcome to SSAI travel portal.',
    //   title: 'Recently login successfully, Welcome to SSAI travel portal.',
    //   html: 'Recently login successfully, Welcome to SSAI travel portal.'
    // })
    return {status: 200, data: {
      accessToken,
      ...payload,
    }};
  },
  doOktaLogin: async () => {
    return {};
  },
  doRegistration: async (requestBody) => {
    const { fname,lname, email, phone, employeeCode } = requestBody;
    const user = await new User();
    user.fname = fname;
    user.lname = lname;
    user.email = email;
    user.phone = phone;
    user.employeeCode = employeeCode;
    user.password = helper.generatePassword();
    const tSettingsList = await TemplateSettings.find({templateFor:'registration'}).exec();
    const mSettingsList = await MailerSettings.find().exec();
    user.save().then(function(data){
      EmailServices.mailNotification( {
        from: mSettingsList[0].emailId || 'travel_support@ssaihq.com',
        to: user.email,
        subject: tSettingsList[0].subject || 'Registration successfully, Welcome to SSAI travel portal.',
        title: tSettingsList[0].title || 'Registration successfully, Welcome to SSAI travel portal.',
        html: tSettingsList[0].html || 'Registration successfully, Welcome to SSAI travel portal. and your password is  '+ password, 
      })
      return {status: 200, data: data};
    }).catch(function(err){
      return {status: 404, data: err};
      //throw new NotFoundError('Error while register : ' + err);
    });
  },
  resetPassword: async (requestBody) => {
    const { email, password } = requestBody;
    User.updateOne({ email: email }, { password: password }).then(function(data){
      return { status: 200, data: data};
    }).catch(function(err){
      return {status: 404, data: err};
      //throw new NotFoundError('Error while reset : ' + err);
    })
  },
  doLogout: async (requestBody) => {
    requestBody.session.destroy();
    return true;
  }
};

module.exports = AuthService;
