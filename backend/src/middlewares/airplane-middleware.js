const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');

const validateCreateRequest = async (req, res, next)=>{
    if(!req.body.modelNumber){
        ErrorResponse.message =  "Something went wrong while creating airplane!";
        ErrorResponse.error = {explanation: "modelNumber not found in the correct format"};
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
};

module.exports = {
    validateCreateRequest,
}