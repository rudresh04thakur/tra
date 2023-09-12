const Request = require('../../db/models/Request')
const { NotFoundError } = require('../../utils/api-errors');

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
        } = requestBody;
        const request = await new Request();
            request.fname = fname;
            request.lname = lname;
            request.email = email;
            request.phone = phone;
            request.employeeCode = employeeCode;
            request.contractNumber = contractNumber,
            request.charge = charge,
            request.virtualPersonalEvent = virtualPersonalEvent,
            request.tripJustification = tripJustification,
            request.tripOrganization = tripOrganization,
            request.travelFrom = travelFrom,
            request.travelTo = travelTo,
            request.workDestination = workDestination,
            request.travelDate = travelDate,
            request.numberOfDays = numberOfDays,
            request.numberOfVacation = numberOfVacation,
            request.foreignTrip = foreignTrip,
            request.itAsset = itAsset,
            request.airlinereservation = airlinereservation,
            request.hotelreservation = hotelreservation,
            request.conferenceregistration = conferenceregistration,
            request.conferenceregistrationfee = conferenceregistrationfee,
            request.requestcash = requestcash,
            request.estimatecost = estimatecost,
            request.registerNcts = registerNcts,
            request.nctsEmail = nctsEmail,
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
            request.milageDays = milageAmount,
            request.milageTotal = milageTotal,
            request.createdBy = createdBy,
            request.approvedBy = approvedBy
        return request.save().then(function (data) {
            return { id: data['_id'] };
        }).catch(function (err) {
            throw new NotFoundError('Error while request : ' + err);
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
            throw new NotFoundError('Request not found');
        }
        return request;
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
            throw new NotFoundError('Request not found in list');
        }
        return request;
    },
    getRequestDetailsOnFname: async (requestBody) => {
        const { fname } = requestBody;
        const request = await Request.findOne({ fname: fname }).exec();
        if (!request) {
            throw new NotFoundError('Request not found');
        }
        return request;
    },
    getRequestDetailsOnLname: async (requestBody) => {
        const { lname } = requestBody;
        const request = await Request.findOne({ lname: lname }).exec();
        if (!request) {
            throw new NotFoundError('Request not found');
        }
        return request;
    },
    doListRequest: async (requestBody) => {
        let requests = '';
        if (typeof requestBody.session.profile.role != undefined && requestBody.session.profile.role != 4) {
            if (typeof requestBody.session.profile.id != undefined) {
                requests = await Request.find({ createdBy: requestBody.session.profile.id }).exec();
            }
        } else {
            requests = await Request.find().exec();
        }
        if (!requests) {
            throw new NotFoundError('Request not found');
        }
        console.log("ttt ------- ", requests);
        return requests;
    },
    travelEdit: async (requestParam) => {
        const { id } = requestParam;
        const requestItem = await Request.findOne({ _id: id }).exec();
        if (!requestItem) {
          throw new NotFoundError('Request not found in view');
        }
        return requestItem;
      },
};



module.exports = RequestService;
