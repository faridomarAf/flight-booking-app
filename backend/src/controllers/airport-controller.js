const {AirportService} = require('../services');
const {StatusCodes} = require('http-status-codes');
const {ErrorResponse, SuccessResponse} = require('../utils/common');


const createAirport = async (req, res)=>{
    const {name, code, address, cityId} = req.body;

    try {
        const airport = await AirportService.createAirport({
            name,
            code,
            address,
            cityId
        });

        SuccessResponse.data = airport;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};


module.exports = {
    createAirport,
    
}