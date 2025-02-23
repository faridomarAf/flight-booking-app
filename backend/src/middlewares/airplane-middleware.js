const {StatusCodes} = require('http-status-codes');

const validateCreateRequest = async (req, res, next)=>{
    if(!req.body.modelNumber){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Something went wrong while creating airplane!",
            data: {},
            error: {error: "modelNumber not found in the correct format", }
        });
    }

    next();
};

module.exports = {
    validateCreateRequest,
}