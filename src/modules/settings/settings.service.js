const Settings = require('../../db/models/Settings');
const { ObjectId } = require('mongodb');
const { NotFoundError } = require('../../utils/api-errors');
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
      return { status: 200, data: data};
    }).catch(function (err) {
      return {status: 404, data: err};
      //throw new NotFoundError('Error while update : ' + err);
    });
  },
  doListSettings: async (requestBody) => {
    const settings = await Settings.find().exec();
    if (!settings) {
      return {status: 404, data: 'Setting not found in list'};
      //throw new NotFoundError('Settings not found in list');
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



    return { status: 200, data: settings};
  },
  doViewSettings: async (requestBody) => {
    const { id } = requestBody;
    const settings = await Settings.findOne({ _id: id }).exec();
    if (!settings) {
      return {status: 404, data: 'Setting not found in view'};
      //throw new NotFoundError('Settings not found in view');
    }
    return { status: 200, data: settings};
  },
  doGetSettings: async (requestBody) => {
    const { name } = requestBody;
    const settings = await Settings.findOne({ name: name }).exec();
    if (!settings) {
      return {status: 404, data: 'Setting not found in view'};
      //throw new NotFoundError('Settings not found in view');
    }
    return { status: 200, data: settings};
  },
  doEditSettings: async (requestParam) => {
    const { id } = requestParam;
    const settings = await Settings.findOne({ _id: id }).exec();
    if (!settings) {
      return {status: 404, data: 'Setting not found in view'};
      //throw new NotFoundError('Settings not found in view');
    }
    return { status: 200, data: settings};
  },
  doDeleteSettings: async (requestBody) => {
    const { id } = requestBody;
    const settings = await Settings.deleteOne({_id: id});
    if (!settings) {
      return {status: 404, data: 'Setting not found in view'};
      //throw new NotFoundError('Settings not found in view');
    }
    return { status: 200, data: settings};
  },
  doAddSettings: async (requestBody) => {
    const { label, number, slug } = requestBody;
    const settings = await new Settings();
    settings.label = label;
    settings.number = number;
    settings.slug = slug.toLowerCase().replace(/ /g,"-");
    settings.save().then(function(data){
      return { status: 200, data: data};
    }).catch(function(err){
      return {status: 404, data: err};
      //throw new NotFoundError('Error while save settings : ' + err);
    });
  },

  doUpdateMailer: async (requestBody) => {
    const { emailId, password } = requestBody;
    Settings.updateOne({ _id: id },{
      emailId: emailId,
      password: password
    }).then(function (data) {
      return { status: 200, data: data};
    }).catch(function (err) {
      return {status: 404, data: err};
      //throw new NotFoundError('Error while update : ' + err);
    });
  },
};

module.exports = SettingsService;
