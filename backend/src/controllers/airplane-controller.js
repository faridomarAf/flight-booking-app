const {AirplaneService} = require('../services');
const {StatusCodes} = require('http-status-codes');
const {ErrorResponse, SuccessResponse} = require('../utils/common');

const createAirplane = async (req, res)=>{
    const {modelNumber, capacity} = req.body;

    try {
        const airplane = await AirplaneService.createAirplance({
            modelNumber,
            capacity
        });

        SuccessResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

module.exports ={
    createAirplane,
    
}