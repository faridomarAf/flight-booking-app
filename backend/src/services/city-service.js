const {CityRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const { AppError } = require('../utils');

const createCity = async(data)=>{
    const cityRepository = new CityRepository();

    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){//this if-block handles validation for-client-bad-request
            let explanation = [];
            error.errors.forEach((err)=>{
                explanation.push(err.message);
            }); 
            
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
}
throw new AppError('Cannot create a new City object', StatusCodes.INTERNAL_SERVER_ERROR);

};


const updateCity = async (id, data) => {
    const cityRepository = new CityRepository();

    try {
        return await cityRepository.update(id, data);
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested to update is not found!', error.statusCode);
        }
        throw new AppError("Cannot update city", StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const getCities = async()=>{
    const cityRepository = new CityRepository();
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch (error) {
        throw new AppError('Cannot fetch cities', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const getCity = async (id)=>{
    const cityRepository = new CityRepository();
    try {
        const city = await cityRepository.get(id);
        return city
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested is not found!', error.statusCode);
        }
        throw new AppError('Connot found city with this ID', error.statusCode);
    }
};

const destroyCity = async(id)=>{
    const cityRepository = new CityRepository();
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('The city you request to delete not found!', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports ={
    createCity,
    updateCity,
    getCities,
    getCity,
    destroyCity
}