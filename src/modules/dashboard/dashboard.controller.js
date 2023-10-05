const DashboardService = require('./dashboard.service');
const helper = require('../../utils/helper');

const DashboardController = {
  /**
   * Handle logging in user.
   * @async
   * @function
   * @param {ExpressRequest} httpRequest incoming http request
   * @returns {Promise.<ControllerResponse> }
   */
  dashboard: async (httpRequest) => {
    const requestList = await DashboardService.dashboard(httpRequest);
    return { returnType: 'render', path: 'dashboard', options: {data: requestList, roles: helper.getUserRoleLabel() } }
  },
};

module.exports = DashboardController;
