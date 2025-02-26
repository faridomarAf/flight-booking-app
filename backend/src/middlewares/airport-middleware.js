const {ErrorResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');
const {AppError} = require('../utils');


const validateCreateRequest = async(req, res, next)=>{
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong while creating Airport!';
        ErrorResponse.error = new AppError(["Airport name not found in the correct format"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.code){
        ErrorResponse.message = 'Something went wrong while creating Airport!';
        ErrorResponse.error = new AppError(["Airport Code not found in the correct format"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.cityId){
        ErrorResponse.message = 'Something went wrong while creating Airport!';
        ErrorResponse.error = new AppError([" Airport cityId not found in the correct format"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
};

module.exports = {
    validateCreateRequest
}