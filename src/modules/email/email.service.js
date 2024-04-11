const Email = require('../../db/models/Email');
const { NotFoundError } = require('../../utils/api-errors');
const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
var mailConfig;
if (process.env.NODE_ENV === 'production') {
  // all emails are delivered to destination
  mailConfig = {
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'rudresh04thakur@gmail.com',
      pass: 'xstr qjov udvi ouam'
    }
  };
} else {
  mailConfig = {
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'rudresh04thakur@gmail.com',
      pass: 'xstr qjov udvi ouam'
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
    // fs.readdir('D:/sevenmentor/travelportal_final/src/public/database/user', async (error, files) => {
    //   filearray =[]
    //   if (error) {
    //     console.log("error in read folder",error);
    //   } else {
    //     for(i=0;i<files.length;i++){
    //       fileContents =  yaml.load(await fs.readFileSync('D:/sevenmentor/travelportal_final/src/public/database/user/'+files[i], 'utf8'));
    //       filearray.push(fileContents);
    //     }
    //     console.log("Length of files ",files.length); 
    //     let yamlStr = yaml.dump(filearray);
    //     fs.writeFileSync('D:/sevenmentor/travelportal_final/src/public/database/users.yaml', yamlStr, 'utf8');
    //   }
    //   // let fileContents = fs.readFileSync('/database/user/*.yaml', 'utf8');
    //   // let data = yaml.safeLoad(fileContents);
    // });



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
    const { label, number, slug } = requestBody;
    const email = await new Email();
    email.label = label;
    email.number = number;
    email.slug = slug.toLowerCase().replace(/ /g, "-");
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
    transporter.sendMail(mailOption).then(info => {
      data = info
      console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    });
    // function (err, info) {
    //   if (err) {
    //     data = err;
    //     console.log("test 1 -------------------------------------------- ",err);
    //   } else {
    //     data = info;
    //     console.log("test 2 -------------------------------------------- ",info);
    //   }
    // });
    return { status: 200, data: data};
  }
};

module.exports = EmailService;
