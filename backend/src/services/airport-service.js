const {AirportRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const { AppError } = require('../utils');

const createAirport = async(data)=>{
    const airportRepository = new AirportRepository();
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        console.log(error);
        if(error.name === 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airport object!', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const getAirports = async()=>{
    const airportRepository = new AirportRepository();
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Cannot fetch of Airports!', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};


const getAirport = async(id)=>{
    const airportRepository = new AirportRepository();
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('The airport that you requested is not found!', error.statusCode);
        }
        throw new AppError('Cannot fetch of the Airport by its ID!', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};


const destroyAirport = async(id)=>{
    const airportRepository = new AirportRepository();
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested to deleted not found!', error.statusCode);
        }
        throw new AppError('Cannot delete the airport!', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};


const updateAirport = async (id, data)=>{
    const airportRepository = new AirportRepository();
    try {
        const airport = await airportRepository.update(id, data);
        return airport
    } catch (error) {
        console.log(error);
        
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested to update is not found!', error.statusCode);
        }
        throw new AppError("Cannot update airport!", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}





module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}