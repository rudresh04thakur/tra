const Settings = require('../../db/models/Settings');
const MailerSettings = require('../../db/models/MailerSettings');
const TemplateSettings = require('../../db/models/TemplateSettings');
const SettingsService = {
  /**
   * Logs in a user and generates a token.
   * @async
   * @function
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} If the user is not found.
   */
  doUpdateSettings: async (requestBody) => {
    const { id, label, number } = requestBody;
    Settings.updateOne({ _id: id }, {
      label: label,
      number: number
    }).then(function (data) {
      return { status: 200, data: data };
    }).catch(function (err) {
      return { status: 404, data: err };
      //throw new NotFoundError('Error while update : ' + err);
    });
  },
  doListSettings: async (requestBody) => {
    const settings = await Settings.find().exec();
    if (!settings) {
      return { status: 404, data: 'Setting not found in list' };
      //throw new NotFoundError('Settings not found in list');
    }
    return { status: 200, data: settings };
  },
  doViewSettings: async (requestBody) => {
    const { id } = requestBody;
    const settings = await Settings.findOne({ _id: id }).exec();
    if (!settings) {
      return { status: 404, data: 'Setting not found in view' };
      //throw new NotFoundError('Settings not found in view');
    }
    return { status: 200, data: settings };
  },
  doGetSettings: async (requestBody) => {
    const { name } = requestBody;
    const settings = await Settings.findOne({ name: name }).exec();
    if (!settings) {
      return { status: 404, data: 'Setting not found in view' };
      //throw new NotFoundError('Settings not found in view');
    }
    return { status: 200, data: settings };
  },
  doEditSettings: async (requestParam) => {
    const { id } = requestParam;
    const settings = await Settings.findOne({ _id: id }).exec();
    if (!settings) {
      return { status: 404, data: 'Setting not found in view' };
      //throw new NotFoundError('Settings not found in view');
    }
    return { status: 200, data: settings };
  },
  doDeleteSettings: async (requestBody) => {
    const { id } = requestBody;
    const settings = await Settings.deleteOne({ _id: id });
    if (!settings) {
      return { status: 404, data: 'Setting not found in view' };
      //throw new NotFoundError('Settings not found in view');
    }
    return { status: 200, data: settings };
  },
  doAddSettings: async (requestBody) => {
    const { label, number, slug } = requestBody;
    const settings = await new Settings();
    settings.label = label;
    settings.number = number;
    settings.slug = slug.toLowerCase().replace(/ /g, "-");
    settings.save().then(function (data) {
      return { status: 200, data: data };
    }).catch(function (err) {
      return { status: 404, data: err };
      //throw new NotFoundError('Error while save settings : ' + err);
    });
  },

  doUpdateMailer: async (requestBody) => {
    const { smtp, smtpport, username, emailId, password } = requestBody;
    Settings.updateOne({ _id: id }, {
      smtp: smtp,
      smtpport: smtpport,
      username: username,
      emailId: emailId,
      password: password,
      secure: false
    }).then(function (data) {
      return { status: 200, data: data };
    }).catch(function (err) {
      return { status: 404, data: err };
      //throw new NotFoundError('Error while update : ' + err);
    });
  },

  doSaveMailer: async (requestBody) => {
    const { smtp, smtpport, username, emailId, password } = requestBody;
    const mSettingsList = await MailerSettings.find().exec();
    if (mSettingsList.length > 0) {
      MailerSettings.updateOne({ _id: mSettingsList[0]._id }, {
        smtp: smtp,
        smtpport: smtpport,
        username: username,
        emailId: emailId,
        password: password,
        secure: false
      }).then(function (data) {
        return { status: 200, data: data };
      }).catch(function (err) {
        return { status: 404, data: err };
        //throw new NotFoundError('Error while update : ' + err);
      });
    } else {
      const mailerSettings = await new MailerSettings();
      mailerSettings.smtp = smtp;
      mailerSettings.smtpport = smtpport;
      mailerSettings.username = username;
      mailerSettings.emailId = emailId;
      mailerSettings.password = password;
      mailerSettings.secure = false;
      mailerSettings.save().then(function (data) {
        return { status: 200, data: data };
      }).catch(function (err) {
        return { status: 404, data: err };
        //throw new NotFoundError('Error while update : ' + err);
      });
    }
  },

  doSaveTemplate: async (requestBody) => {
    const { templateFor, title, subject, html } = requestBody;
    const tSettingsList = await TemplateSettings.find({templateFor:templateFor}).exec();
    if (tSettingsList.length > 0) {
      TemplateSettings.updateOne({ _id: tSettingsList[0]._id }, {
        templateFor: templateFor,
        title: title,
        subject: subject,
        html: html,
        status: true
      }).then(function (data) {
        return { status: 200, data: data };
      }).catch(function (err) {
        return { status: 404, data: err };
        //throw new NotFoundError('Error while update : ' + err);
      });
    } else {
      const templateSettings = await new TemplateSettings();
      templateSettings.templateFor = templateFor;
      templateSettings.title = title;
      templateSettings.subject = subject;
      templateSettings.html = html;
      templateSettings.status = true;
      templateSettings.save().then(function (data) {
        return { status: 200, data: data };
      }).catch(function (err) {
        return { status: 404, data: err };
        //throw new NotFoundError('Error while update : ' + err);
      });
    }
  },
};

module.exports = SettingsService;
