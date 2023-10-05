const { isArray } = require('lodash');
const Request = require('../../db/models/Request')
const Um = require('../../db/models/Um')
const Ar = require('../../db/models/ApproverRole')
const { NotFoundError } = require('../../utils/api-errors');

const DashboardService = {
  /**
   * Logs in a user and generates a token.
   * @async
   * @function
   * @param {UserDto} requestBody - Request Body
   * @returns {Context} Context object
   * @throws {NotFoundError} If the user is not found.
   */
  dashboard: async (requestBody) => {
    let requests = '';
    let selfRequests = '';
    let isPm = false;
    let isTm = false;
    let isGl = false;
    let isTc = false;
    let emailArray = [];
    let pm = await Um.find({ pm_email: requestBody.session.profile.email }).exec();
    let tm = await Um.find({ tm_email: requestBody.session.profile.email }).exec();
    let gl = await Um.find({ gl_email: requestBody.session.profile.email }).exec();
    let tc = await Um.find({ tc_email: requestBody.session.profile.email }).exec();
    if (pm.length > 0) {
      pm.forEach((item) => {
        emailArray.push(item.employee_email);
      })
      isPm = true;
    }
    if (tm.length > 0) {
      tm.forEach((item) => {
        emailArray.push(item.employee_email);
      })
      isTm = true;
    }
    if (gl.length > 0) {
      gl.forEach((item) => {
        emailArray.push(item.employee_email);
      })
      isGl = true;
    }
    if (tc.length > 0) {
      tc.forEach((item) => {
        emailArray.push(item.employee_email);
      })
      isTc = true;
    }

    let makeResponse = {
      others: {
        requests: [],
        approved: 0,
        pending: 0,
        rejected: 0
      },
      selfHistory: {
        requests: [],
        approved: 0,
        pending: 0,
        rejected: 0
      }
    }

    if (typeof requestBody.session.profile.role != undefined && requestBody.session.profile.role != 'admin') {
      if (typeof requestBody.session.profile.id != undefined) {
        makeResponse.others.requests = await Request.find({
          "email": {
            "$in": emailArray
          }
        });
        makeResponse.others.approved = await Request.count({
          $and: [
            {
              "email": {
                $in: emailArray
              }
            },
            {
              "status": /^.*approved.*$/i
            }
          ]
        });
        makeResponse.others.rejected = await Request.count({
          $and: [
            {
              "email": {
                $in: emailArray
              }
            },
            {
              "status": /^.*rejected.*$/i
            }
          ]
        });
        makeResponse.others.pending = await Request.count({
          $and: [
            {
              "email": {
                $in: emailArray
              }
            },
            {
              "status": /^.*pending.*$/i
            }
          ]
        });

        makeResponse.selfHistory.requests = await Request.find({
          "createdBy": requestBody.session.profile.id
        });
        makeResponse.selfHistory.approved = await Request.count({
          $and: [
            {
              "createdBy": requestBody.session.profile.id
            },
            {
              "status": /^.*approved.*$/i
            }
          ]
        });
        makeResponse.selfHistory.rejected = await Request.count({
          $and: [
            {
              "createdBy": requestBody.session.profile.id
            },
            {
              "status": /^.*rejected.*$/i
            }
          ]
        });
        makeResponse.selfHistory.pending = await Request.count({
          $and: [
            {
              "createdBy": requestBody.session.profile.id
            },
            {
              "status": /^.*pending.*$/i
            }
          ]
        });
      }
    } else {

      makeResponse.others.requests = await Request.find();
      makeResponse.others.approved = await Request.count({
        "status": /^.*approved.*$/i
      });
      makeResponse.others.rejected = await Request.count(
        {
          "status": /^.*rejected.*$/i
        }
      );
      makeResponse.others.pending = await Request.count(
        {
          "status": /^.*pending.*$/i
        });
    }

    return makeResponse;
  },
};

module.exports = DashboardService;
