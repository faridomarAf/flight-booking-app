const {CityService} = require('../services');
const {ErrorResponse, SuccessResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');

const createCity = async(req, res)=>{
    const {name} = req.body;

    try {
        const city = await CityService.createCity({
            name
        });
        SuccessResponse.data = city;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports ={
    createCity,
}