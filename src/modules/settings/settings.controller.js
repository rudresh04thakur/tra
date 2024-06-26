const SettingsService = require('./settings.service');
const helper = require('../../utils/helper');

const SettingsController = {
  /**
   * Handle logging in user.
   * @async
   * @function
   * @param {ExpressRequest} httpRequest incoming http request
   * @param {ExpressResponse} httpResponse incoming http response
   * @returns {Promise.<ControllerResponse> }
   */
  update: async (httpRequest) => {
    const settingsData = await SettingsService.doUpdateSettings({
      ...httpRequest.body
    });
    return { returnType: 'redirect', path: 'list' }
  },
  list: async (httpRequest) => {
    const settingsList = await SettingsService.doListSettings({
      ...httpRequest.body
    });
    return { returnType: 'render', path: 'settings-list', options: { settings: settingsList.data } }
  },
  view: async (httpRequest) => {
    const settings = await SettingsService.doViewSettings({
      ...httpRequest.params
    });
    return helper.generateResponse(settings);
  },
  edit: async (httpRequest) => {
    const settings = await SettingsService.doEditSettings({
      ...httpRequest.params
    });
    return { returnType: 'render', path: 'settings-update', options: { settings: settings.data } }
    //return helper.generateResponse(userList);
  },
  delete: async (httpRequest) => {
    const settings = await SettingsService.doDeleteSettings({
      ...httpRequest.body
    });
    return { returnType: 'redirect', path: 'list' }
  },
  getAdd:  async (httpRequest) => {
    return { returnType: 'render', path: 'settings-add'}
  },
  add:  async (httpRequest) => {
    const settings = await SettingsService.doAddSettings({
      ...httpRequest.body
    });
    return { returnType: 'redirect', path: 'list'}
  },
  updateMailer: async (httpRequest) => {
    const mailerData = await SettingsService.doUpdateMailer({
      ...httpRequest.body
    });
    if(mailerData.status == 200){
      httpRequest.toastr.success("Mailer updated successfully", "Update successfully" );
    }else{
      httpRequest.toastr.error("Mailer not updated","Error in update");
    }
    return { returnType: 'redirect', path: 'list' }
  },
  saveMailer: async (httpRequest) => {
    const mailerData = await SettingsService.doSaveMailer({
      ...httpRequest.body
    });
    if(role.status == 200){
      httpRequest.toastr.success("Mailer saved successfully", "Save successfully" );
    }else{
      httpRequest.toastr.error("Mailer not saved","Error in save");
    }
    return { returnType: 'redirect', path: 'list' }
  },
  saveTemplate: async (httpRequest) => {
    const templateData = await SettingsService.doSaveTemplate({
      ...httpRequest.body
    });
    if(templateData.status == 200){
      httpRequest.toastr.success("Template saved successfully", "Save successfully" );
    }else{
      httpRequest.toastr.error("Template not saved","Error in save");
    }
    return { returnType: 'redirect', path: 'list' }
  },

  
  

};

module.exports = SettingsController;
