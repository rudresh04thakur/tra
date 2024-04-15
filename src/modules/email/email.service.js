const Email = require('../../db/models/Email');
const { NotFoundError } = require('../../utils/api-errors');
const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
var mailConfig;
if (process.env.NODE_ENV === 'production') {
  // all emails are delivered to destination
  mailConfig = {
    host: "smtp.email.us-langley-1.oci.oraclegovcloud.com",
    port: 587,
    secure: false,
    auth: {
      user: 'ocid1.user.oc2..aaaaaaaagbign3huevz4nfkjhdym6oib7ull2dfwy65dmxabi25chghklqcq@ocid1.tenancy.oc2..aaaaaaaapti3434qa3m3rcgizgazhd6n56mz3ayh5vtat5z2cbbsmbkvt74a.co.com',
      pass: 'wKFS;!k&Bd;8W-XQob)C'
    }
  };
} else {
  mailConfig = {
    host: "smtp.email.us-langley-1.oci.oraclegovcloud.com",
    port: 587,
    secure: false,
    auth: {
      user: 'ocid1.user.oc2..aaaaaaaagbign3huevz4nfkjhdym6oib7ull2dfwy65dmxabi25chghklqcq@ocid1.tenancy.oc2..aaaaaaaapti3434qa3m3rcgizgazhd6n56mz3ayh5vtat5z2cbbsmbkvt74a.co.com',
      pass: 'wKFS;!k&Bd;8W-XQob)C'
    }
  };
}
const transporter = nodemailer.createTransport(mailConfig);

transporter.set("oauth2_provision_cb", (user, renew, callback) => {
  let accessToken = userTokens[user];
  if (!accessToken) {
    return callback(new Error("Unknown user"));
  } else {
    return callback(null, accessToken);
  }
});

const EmailService = {
  /**
   * Logs in a user and generates a token.
   * @async
   * @function
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} If the user is not found.
   */
  doUpdateEmail: async (requestBody) => {
    const { id, label, number } = requestBody;
    Email.updateOne({ _id: id }, {
      label: label,
      number: number
    }).then(function (data) {
      return { status: 200, data: data};
    }).catch(function (err) {
      return {status: 404, data: err};
      //throw new NotFoundError('Error while update : ' + err);
    });
  },
  doListEmail: async (requestBody) => {
    const email = await Email.find().exec();
    if (!email) {
      return {status: 404, data: 'email not fount in list'};
      //throw new NotFoundError('Email not found in list');
    }
    return { status: 200, data: email};
  },
  doViewEmail: async (requestBody) => {
    const { id } = requestBody;
    const email = await Email.findOne({ _id: id }).exec();
    if (!email) {
      return {status: 404, data: 'email not fount in view'};
      //throw new NotFoundError('Email not found in view');
    }
    return { status: 200, data: email};
  },
  doEditEmail: async (requestParam) => {
    const { id } = requestParam;
    const email = await Email.findOne({ _id: id }).exec();
    if (!email) {
      return {status: 404, data: 'email not fount in view'};
      //throw new NotFoundError('Email not found in view');
    }
    return { status: 200, data: email};
  },
  doDeleteEmail: async (requestBody) => {
    const { id } = requestBody;
    const email = await Email.deleteOne({ _id: id });
    if (!email) {
      return {status: 404, data: 'email not found in view'};
      //throw new NotFoundError('Email not found in view');
    }
    return { status: 200, data: email};
  },
  doAddEmail: async (requestBody) => {
    const { templateName, title, subject, html } = requestBody;
    const email = await new Email();
    email.templateName = templateName;
    email.title = title;
    email.subject = subject;
    email.html = html;
    email.save().then(function (data) {
      return { status: 200, data: data};
    }).catch(function (err) {
      return {status: 404, data: err};
      //throw new NotFoundError('Error while save email : ' + err);
    });
  },
  sendMail: async (mailData) => {
    const mailOption = {
      from: {
        name: 'SSAI Travel Portal',
        address: mailData.from,
      },
      to: mailData.to,
      subject: mailData.subject,
      text: mailData.title,
      html: mailData.html,
    };
    let data = ''
    transporter.sendMail(mailOption,
    function (err, info) {
      if (err) {
        data = err;
        console.log("test 1 -------------------------------------------- ",err);
      } else {
        data = info;
        console.log("test 2 -------------------------------------------- ",info);
      }
    });
    return { status: 200, data: data};
  }
};

module.exports = EmailService;
