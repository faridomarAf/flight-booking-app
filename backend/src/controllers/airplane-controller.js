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
        return res.status(error.statusCode).json(ErrorResponse);//statusCode come from service -> AppError
    }
};

const getAirplanes = async(req, res)=>{
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports ={
    createAirplane,
    getAirplanes,
    
}