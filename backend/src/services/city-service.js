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

}

module.exports ={
    createCity
}