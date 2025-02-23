const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const { AppError } = require('../utils');

const validateCreateRequest = async (req, res, next)=>{
    if(!req.body.modelNumber){
        ErrorResponse.message =  "Something went wrong while creating airplane!";

        //to keep handling error more consistently in explanation array
        ErrorResponse.error = new AppError(["modelNumber not found in the correct format"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
};

module.exports = {
    validateCreateRequest,
}