const {ErrorResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');
const {AppError} = require('../utils');


const validateCreateRequest = async(req, res, next)=>{
    if(!req.body.flightNumber){
        ErrorResponse.message = 'Something went wrong when creating Flight!'
        ErrorResponse.error = new AppError('flightNumber cannot be null, or wrong format', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.airplaneId){
        ErrorResponse.message = 'Something went wrong when creating Flight!'
        ErrorResponse.error = new AppError('airplaneId cannot be null, or wrong format', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.departureAirportId){
        ErrorResponse.message = 'Something went wrong when creating Flight!'
        ErrorResponse.error = new AppError('departureAirportId cannot be null, or wrong format', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.arrivalAirportId){
        ErrorResponse.message = 'Something went wrong when creating Flight!'
        ErrorResponse.error = new AppError('arrivalAirportId cannot be null, or wrong format', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.arrivalTime){
        ErrorResponse.message = 'Something went wrong when creating Flight!'
        ErrorResponse.error = new AppError('arrivalTime cannot be null, or wrong format', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.departureTime){
        ErrorResponse.message = 'Something went wrong when creating Flight!'
        ErrorResponse.error = new AppError('departureTime cannot be null, or wrong format', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.price){
        ErrorResponse.message = 'Something went wrong when creating Flight!'
        ErrorResponse.error = new AppError('price filed cannot be null, or wrong format', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.totalSeats){
        ErrorResponse.message = 'Something went wrong when creating Flight!'
        ErrorResponse.error = new AppError('totalSeats cannot be null, or wrong format', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
};

const validateUpdateSeats = async(req, res, next)=>{
    if(!req.body.seats){
        ErrorResponse.message = 'Something went wrong when updating Flight seats!';
        ErrorResponse.error = new AppError('seats cannot be null, or wrong format', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}


module.exports ={
    validateCreateRequest,
    validateUpdateSeats
}