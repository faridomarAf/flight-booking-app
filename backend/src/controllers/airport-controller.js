const {AirportService} = require('../services');
const {StatusCodes} = require('http-status-codes');
const {ErrorResponse, SuccessResponse} = require('../utils/common');


//Create airport
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


//Get All Airports
const getAirports = async(req, res)=>{
    try {
        const ariports = await AirportService.getAirports();
        SuccessResponse.data = ariports;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

//Get airport by ID
const getAirport = async(req, res)=>{
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

//Update Airport
const updateAirport = async (req, res)=>{
    const id = req.params.id;
    const data = req.body;

    try {
        const airport = await AirportService.updateAirport(req.params.id, req.body);
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.data = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

//Delete airport
const deleteAirport = async(req, res)=>{
    try {
        const response = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    updateAirport,
    deleteAirport
}