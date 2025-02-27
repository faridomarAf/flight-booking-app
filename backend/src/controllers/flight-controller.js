const {FlightService} = require('../services');
const {StatusCodes} = require('http-status-codes');
const {ErrorResponse, SuccessResponse} = require('../utils/common');
const {AppError} = require('../utils');


//Create Flight
/* route: http://localhost:3500/api/v1/flights

"data": {
        "flightNumber": "UK 808",
        "airplaneId": "1",
        "departureAirportId": "MUM", //=> this is the code of airport
        "arrivalAirportId": "BLR", //=> this is the code of airport
        "arrivalTime": "2025-01-17 04:33:12", //=> sequelize date-format
        "departureTime": "2025-01-17 02:33:12",//=> sequelize date-format
        "price": "3500",
        "totalSeats": "120",
    },


*/
const createFlight = async(req, res)=>{
    const {
        flightNumber, 
        airplaneId, 
        departureAirportId, 
        arrivalAirportId, 
        arrivalTime, 
        departureTime, 
        price, 
        boardingGate, 
        totalSeats 
    } = req.body;

    try {
        const flight = await FlightService.createFlight({
            flightNumber, 
            airplaneId, 
            departureAirportId, 
            arrivalAirportId, 
            arrivalTime, 
            departureTime, 
            price, 
            boardingGate, 
            totalSeats 
        });

        SuccessResponse.data = flight;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};


module.exports = {
    createFlight
}