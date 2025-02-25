const {AppError} = require('../utils');
const {ErrorResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');

const validateCreateRequest = async (req, res, next)=>{
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong when creating City!';
        ErrorResponse.error = new AppError('City name cannot be null, or wrong format', StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
};

module.exports = {validateCreateRequest}