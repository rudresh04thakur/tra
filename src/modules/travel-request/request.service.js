const { isArray } = require('lodash');
const Request = require('../../db/models/Request')
const Um = require('../../db/models/Um')
const Ar = require('../../db/models/ApproverRole')
const TemplateSettings = require('../../db/models/TemplateSettings')
const MailerSettings = require('../../db/models/MailerSettings')
const EmailServices = require('../email/email.service')
// const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const RequestService = {
    /**
     * Logs in a user and generates a token.
     * @async
     * @function
     * @param {UserDto} requestBody - Request Body
     * @returns {Context} Context object
     * @throws {NotFoundError} If the user is not found.
     */
    travelRequest: async (requestBody) => {
        const {
            fname,
            lname,
            employeeCode,
            email,
            phone,
            contractNumber,
            charge,
            virtualPersonalEvent,
            tripJustification,
            tripOrganization,
            travelFrom,
            travelTo,
            workDestination,
            travelDate,
            numberOfDays,
            numberOfVacation,
            foreignTrip,
            itAsset,
            airlinereservation,
            hotelreservation,
            conferenceregistration,
            conferenceregistrationfee,
            requestcash,
            estimatecost,
            registerNcts,
            nctsEmail,
            approverName,
            requestApprovalDate,
            groupleader,
            programmanagesDate,
            customerconference,
            customerconferenceDate,
            corDate,
            travelcordinatorDate,
            airfareTrainAmount,
            airfareTrainDays,
            airfareTrainTotal,
            lodgingAmount,
            lodgingDays,
            lodgingTotal,
            mieAmount,
            mieDays,
            mieTotal,
            conferenceAmount,
            conferenceDays,
            conferenceTotal,
            automobileRentalAmount,
            automobileRentalDays,
            automobileRentalTotal,
            allTravelTotal,
            rentalCar,
            pvtVehicle,
            train,
            milageAmount,
            milageDays,
            milageTotal,
            createdBy,
            approvedBy
        } = requestBody.body;
        const request = await new Request();
        request.fname = fname;
        request.lname = lname;
        request.email = email;
        request.phone = phone;
        request.employeeCode = employeeCode;
        request.contractNumber = contractNumber;
        request.charge = charge;
        request.virtualPersonalEvent = virtualPersonalEvent;
        request.tripJustification = tripJustification;
        request.tripOrganization = tripOrganization;
        request.numberOfVacation = numberOfVacation;
        request.foreignTrip = foreignTrip;
        request.itAsset = itAsset;
        request.airlinereservation = airlinereservation;
        request.hotelreservation = hotelreservation;
        request.conferenceregistration = conferenceregistration;
        request.conferenceregistrationfee = conferenceregistrationfee;
        request.requestcash = requestcash;
        request.estimatecost = estimatecost;
        request.registerNcts = registerNcts;
        request.nctsEmail = nctsEmail;
        request.approverName = approverName,
            request.requestApprovalDate = requestApprovalDate,
            request.groupleader = groupleader,
            request.programmanagesDate = programmanagesDate,
            request.customerconference = customerconference,
            request.customerconferenceDate = customerconferenceDate,
            request.corDate = corDate,
            request.travelcordinatorDate = travelDate,
            request.airfareTrainAmount = airfareTrainAmount,
            request.airfareTrainDays = airfareTrainDays,
            request.airfareTrainTotal = airfareTrainTotal,
            request.lodgingAmount = lodgingAmount,
            request.lodgingDays = lodgingDays,
            request.lodgingTotal = lodgingTotal,
            request.mieAmount = mieAmount,
            request.mieDays = mieDays,
            request.mieTotal = mieTotal,
            request.conferenceAmount = conferenceAmount,
            request.conferenceDays = conferenceDays,
            request.conferenceTotal = conferenceTotal,
            request.automobileRentalAmount = automobileRentalAmount,
            request.automobileRentalDays = automobileRentalDays,
            request.automobileRentalTotal = automobileRentalTotal,
            request.allTravelTotal = allTravelTotal,
            request.travelcordinatorDate = travelcordinatorDate,
            request.rentalCar = rentalCar,
            request.pvtVehicle = pvtVehicle,
            request.train = train,
            request.milageAmount = milageAmount,
            request.milageDays = milageDays,
            request.milageTotal = milageTotal,
            request.createdBy = createdBy,
            request.approvedBy = approvedBy;
        if (isArray(travelFrom)) {
            for (let i = 0; i < travelFrom.length; i++) {
                request.travelFrom.push(travelFrom[i]);
                request.travelTo.push(travelTo[i]);
                request.workDestination.push(workDestination[i]);
                request.travelDate.push(travelDate[i]);
                request.numberOfDays.push(numberOfDays[i]);
            };
        } else {
            request.travelFrom = travelFrom;
            request.travelTo = travelTo;
            request.workDestination = workDestination;
            request.travelDate = travelDate;
            request.numberOfDays = numberOfDays;
        }
        var allMails = await Um.find({ employee_email: requestBody.session.profile.email }).exec();
        const tSettingsList = await TemplateSettings.find({templateFor:'new_request'}).exec();
        const mSettingsList = await MailerSettings.find().exec();
        return request.save().then(function (data) {
            EmailServices.mailNotification( {
                from: mSettingsList[0].emailId || 'travel_support@ssaihq.com',
                to: [allMails[0]['tm_email'],allMails[0]['gl_email'],allMails[0]['tc_email'],allMails[0]['pm_email']],
                subject: tSettingsList[0].subject || 'New Request created from SSAI Travel Portal.',
                title: tSettingsList[0].title || 'New Request created from SSAI Travel Portal.',
                html: tSettingsList[0].html || 'New Request created from SSAI Travel Portal.', 
              })
            return { id: data['_id'] };
        }).catch(function (err) {
            return {status: 404, data: err};
            //throw new NotFoundError('Error while request : ' + err);
        });
    },
    getPlaceFromGoogle: async (requestBody) => {
        // try {
        //     const neighborhood = 'chelsea'
        //     const borough = 'manhattan'
        //     const city = 'new+york+city'
        //     const category = 'burgers'
        //     const { data } = await axios.get(

        //         `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${category}+${neighborhood}+${borough}+${city}&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`,
        //     )
        //     console.log(data);
        // }
        // catch (err) {
        //     console.log(err)
        // }

        const payload = {

        };
        const accessToken = await JwtService.generateJWT({
            payload,
        });
        return {
            accessToken,
            ...payload,
        };
    },
    getRequestDetailsOnEid: async (requestBody) => {
        const { eid } = requestBody;
        const request = await Request.findOne({ employeeCode: eid }).exec();
        if (!request) {
            return {status: 404, data: 'request not found'};
            //throw new NotFoundError('Request not found');
        }
        return { status: 200, data: request};
    },
    getListOfName: async (requestBody) => {
        var { fname, lname } = requestBody;
        var searchObject = {};
        var request;
        if (typeof fname != undefined && fname != '') {
            searchObject = { fname: fname }
        } else if (typeof lname != undefined && lname != '') {
            searchObject = { lname: lname }
        }
        if (Object.keys(searchObject).length > 0) {
            request = await Request.find(searchObject).exec();
        }
        if (!request) {
            return {status: 404, data: 'request not found in list'};
            //throw new NotFoundError('Request not found in list');
        }
        return { status: 200, data: request};
    },
    getRequestDetailsOnFname: async (requestBody) => {
        const { fname } = requestBody;
        const request = await Request.findOne({ fname: fname }).exec();
        if (!request) {
            return {status: 404, data: 'request not found'};
            //throw new NotFoundError('Request not found');
        }
        return { status: 200, data: request};
    },
    getRequestDetailsOnLname: async (requestBody) => {
        const { lname } = requestBody;
        const request = await Request.findOne({ lname: lname }).exec();
        if (!request) {
            return {status: 404, data: 'request not found'};
            //throw new NotFoundError('Request not found');
        }
        return { status: 200, data: request};
    },
    doListRequest: async (requestBody) => {
        let requests = '';
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
        if (typeof requestBody.session.profile.role != undefined && requestBody.session.profile.role != 'admin') {
            if (typeof requestBody.session.profile.id != undefined) {
                requests = await Request.find({
                    "$or": [
                        {
                            "createdBy": requestBody.session.profile.id
                        },
                        {
                            "email": {
                                "$in": emailArray
                            }
                        }
                    ]
                }).then(requestItem => {
                    const filteredData = requestItem.filter(requestElement => {
                        if (requestElement.approvers.length > 0) {
                            for (const element of requestElement.approvers) {
                                if (element.approverEId != requestBody.session.profile.id) {
                                    return requestElement;
                                }
                            }
                        } else {
                            return requestElement
                        }
                    });
                    return filteredData || [];
                });

                /*
                , {
                    approvers: {
                        $elemMatch: {
                            approverEId: requestBody.session.profile.id
                        }
                    }
                }
                */
            }
        } else {
            requests = await Request.find().exec();
        }
        if (!requests) {
            return {status: 404, data: 'request not found'};
            //throw new NotFoundError('Request not found');
        }
        return {status: 404, data: requests};

        // {
        //     requests: requests, roleList: {
        //         isPm: isPm,
        //         isTm: isTm,
        //         isGl: isGl,
        //         isTc: isTc
        //     }
        // };
    },
    travelEdit: async (requestParam) => {
        const { id } = requestParam;
        const requestItem = await Request.findOne({ _id: id }).exec();
        if (!requestItem) {
            return {status: 404, data: 'request not found in view'};
            //throw new NotFoundError('Request not found in view');
        }
        return requestItem;
    },
    travelView: async (request) => {
        let requestBody = request.body;
        let requestParam = request.params;
        let isPm = false;
        let isTm = false;
        let isGl = false;
        let isTc = false;
        let emailArray = [];
        let pm = await Um.find({ pm_email: request.session.profile.email }).exec();
        let tm = await Um.find({ tm_email: request.session.profile.email }).exec();
        let gl = await Um.find({ gl_email: request.session.profile.email }).exec();
        let tc = await Um.find({ tc_email: request.session.profile.email }).exec();
        let approverRoleList = await Ar.find().exec();
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
        const { id } = requestParam;
        const requestItem = await Request.findOne({ _id: id }).exec();
        if (!requestItem) {
            return {status: 404, data: 'request not found in approver'};
            //throw new NotFoundError('Request not found in approves  ');
        }
        return {
            requests: requestItem,
            approverRoleList:approverRoleList
        };
    },
    travelApprove: async (request) => {
        let requestBody = request.body;
        let requestParam = request.params;
        let isPm = false;
        let isTm = false;
        let isGl = false;
        let isTc = false;
        let emailArray = [];
        let pm = await Um.find({ pm_email: request.session.profile.email }).exec();
        let tm = await Um.find({ tm_email: request.session.profile.email }).exec();
        let gl = await Um.find({ gl_email: request.session.profile.email }).exec();
        let tc = await Um.find({ tc_email: request.session.profile.email }).exec();
        let approverRoleList = await Ar.find().exec();
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
        const { id } = requestParam;
        const requestItem = await Request.findOne({ _id: id }).exec();
        if (!requestItem) {
            return {status: 404, data: 'request not found in approvers'};
            //throw new NotFoundError('Request not found in approves  ');
        }
        return {
            requests: requestItem,
            approverRoleList:approverRoleList
        };
    },
    travelPostApprove: async (request) => {
        const { id, approverEId, approverRole, approverName, actionDate, approverEmail, remark } = request.body;
        const approverRoleList = await Ar.find().exec();
            
        Request.findOne({ _id: id }
        ).then(requestItem => {
            const itemIndex = requestItem.approvers.map(item => item.approverEId).indexOf(approverEId);
            if (itemIndex > -1) {
                requestItem.approvers[itemIndex].approverRole = approverRole;
                requestItem.approvers[itemIndex].approverName = approverName;
                requestItem.approvers[itemIndex].actionDate = actionDate;
                requestItem.approvers[itemIndex].approverEmail = approverEmail;
                requestItem.approvers[itemIndex].remark = remark;
                requestItem.approvers[itemIndex].approveStatus = true;
                requestItem.approvers[itemIndex].approveLabel = 'approved'
            } else {
                requestItem.approvers.push({
                    approverEId: approverEId,
                    approverRole: approverRole,
                    approverName: approverName,
                    actionDate: actionDate,
                    approverEmail: approverEmail,
                    remark: remark,
                    approveStatus: true,
                    approveLabel: 'approved'
                });
            }
            approverRoleList.sort((prop='priority')=>{    
                return function(a, b) {    
                    if (a[prop] > b[prop]) {    
                        return 1;    
                    } else if (a[prop] < b[prop]) {    
                        return -1;    
                    }    
                    return 0;    
                }    
            });
            for(let i=0;i<approverRoleList.length;i++){
                if(request.session.profile.role == approverRoleList[i].roleSlug) {
                    if(i==approverRoleList.length-1){
                        requestItem.status = 'Approved';
                    }else{
                        requestItem.status = 'Pending: '+approverRoleList[i+1].roleSlug.replace('-',' ').toUpperCase();
                    }
                }
            }
            requestItem.save().then(function (data) {
                return { id: data['_id'] };
            }).catch(function (err) {
                return {status: 404, data: err};
                //throw new NotFoundError('Error while approve request : ' + err);
            });
        });
        return {status:200,msg:'approved'};
    },
    travelPostReject: async (request) => {
        const { id, approverEId, approverRole, approverName, actionDate, approverEmail, remark } = request.body;
        Request.findOne({ _id: id }
        ).then(requestItem => {
            const itemIndex = requestItem.approvers.map(item => item.approverEId).indexOf(approverEId);
            if (itemIndex > -1) {
                requestItem.approvers[itemIndex].approverRole = approverRole;
                requestItem.approvers[itemIndex].approverName = approverName;
                requestItem.approvers[itemIndex].actionDate = actionDate;
                requestItem.approvers[itemIndex].approverEmail = approverEmail;
                requestItem.approvers[itemIndex].remark = remark;
                requestItem.approvers[itemIndex].approveStatus = false;
                requestItem.approvers[itemIndex].approveLabel = 'rejected'
            } else {
                requestItem.approvers.push({
                    approverEId: approverEId,
                    approverRole: approverRole,
                    approverName: approverName,
                    actionDate: actionDate,
                    approverEmail: approverEmail,
                    remark: remark,
                    approveStatus: false,
                    approveLabel: 'rejected'
                });
            }


            requestItem.status = 'Rejected: ' + request.session.profile.role.replace('-',' ').toUpperCase();

            requestItem.save().then(function (data) {
                return { id: data['_id'] };
            }).catch(function (err) {
                return {status: 404, data: err};
                //throw new NotFoundError('Error while approve request : ' + err);
            });
        });
        return {status:200,msg:'rejected'};
    },

    doDeleteRequest: async (requestBody) => {
        const { id } = requestBody;
        const request = await Request.deleteOne({ _id: id });
        if (!request) {
            return {status: 404, data: 'request not found'};
            //throw new NotFoundError('request not found');
        }
        return { status: 200, data: request};
    },
};



module.exports = RequestService;
