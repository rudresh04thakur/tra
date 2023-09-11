const UM = require('../../db/models/Um');
const User = require('../../db/models/User');
const { NotFoundError } = require('../../utils/api-errors');
const fs = require('fs');
const yaml = require('js-yaml');
const  path = require('path');
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
      throw new NotFoundError('user not found in um add');
    }
    return user;
  },
  doUpdateUM: async (requestBody) => {
    const { id, fname, lname, email, phone, employeeCode, role } = requestBody;
    UM.updateOne({ _id: id }, {
      fname: fname,
      lname: lname,
      email: email,
      phone: phone,
      employeeCode: employeeCode,
      role: role
    }).then(function (data) {
      return data;
    }).catch(function (err) {
      throw new NotFoundError('Error while update : ' + err);
    });
  },
  doAddUM: async (requestBody) => {
    const { fname,lname, email, phone, employeeCode, password, role, employer } = requestBody;
    const UM = await new UM();
    UM.fname = fname;
    UM.lname = lname;
    UM.email = email;
    UM.phone = phone;
    UM.employeeCode = employeeCode;
    UM.employer = employer;
    UM.role = role;
    UM.password = password
    UM.save().then(function(data){
      return data;
    }).catch(function(err){
      throw new NotFoundError('Error while save um : ' + err);
    });
  },
  doListUser: async (requestBody) => {
    const um = await UM.find().exec();
    if (!um) {
      throw new NotFoundError('UM not found in list');
    }
    return um;
  },
  doViewUser: async (requestBody) => {
    const { employeeCode } = requestBody;
    const um = await UM.findOne({ employeeCode: employeeCode }).exec();
    if (!um) {
      throw new NotFoundError('UM not found in view');
    }
    return um;
  },
  doEditUser: async (requestParam) => {
    const { id } = requestParam;
    const um = await UM.findOne({ _id: id }).exec();
    if (!um) {
      throw new NotFoundError('UM not found in view');
    }
    return um;
  },
  doDeleteUser: async (requestBody) => {
    const { id } = requestBody;
    const um = await UM.deleteOne({_id: id});
    if (!um) {
      throw new NotFoundError('UM not found in view');
    }
    return um;
  },
  doAddUserFromYaml: async (requestBody) => {
    const { fileName } = requestBody;
    // fs.readdir('D:/sevenmentor/travelportal_final/src/public/database/um', async (error, files) => {
    //   filearray =[]
    //   if (error) {
    //     console.log("error in read folder",error);
    //   } else {
    //     for(i=0;i<files.length;i++){
    //       fileContents =  yaml.load(await fs.readFileSync('D:/sevenmentor/travelportal_final/src/public/database/um/'+files[i], 'utf8'));
    //       filearray.push(fileContents);
    //     }
    //     console.log("Length of files ",files.length); 
    //     let yamlStr = yaml.dump(filearray);
    //     fs.writeFileSync('D:/sevenmentor/travelportal_final/src/public/database/users.yaml', yamlStr, 'utf8');
    //   }
    fileContents =  yaml.load(await fs.readFileSync('D:/sevenmentor/travelportal_final/src/public/uploads/'+fileName, 'utf8'));
    const um = await new UM();
    um.fname = fileContents.fname || '';
    um.lname = fileContents.lname || '';
    um.email = fileContents.email || '';
    um.phone = fileContents.phone || '';
    um.employeeCode = fileContents.eid || '';
    um.employer = fileContents.employer || '';
    um.role = fileContents.role || '';
    um.password = fileContents.password || '';
    um.save().then(function(data){
      return data;
    }).catch(function(err){
      throw new NotFoundError('Error while save um : ' + err);
    });
    // });

  }
};

module.exports = UMService;
