const {CityService} = require('../services');
const {ErrorResponse, SuccessResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');

//Create City
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
};

//Update City
const updateCity = async (req, res)=>{
    const id = req.params.id
    const name = req.body;

    try {
        const updatedCity = await CityService.updateCity(id, name)
        SuccessResponse.data = updatedCity;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

//Get all cities
const getCities = async(req, res)=>{
    try {
        const cities = await CityService.getCities();
        SuccessResponse.data = cities;
        return res.status(StatusCodes.OK).json(cities);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

//Get city by ID
const getCity = async (req, res)=>{
    try {
        const city = await CityService.getCity(req.params.id);
        SuccessResponse.data = city
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports ={
    createCity,
    updateCity,
    getCities,
    getCity
}