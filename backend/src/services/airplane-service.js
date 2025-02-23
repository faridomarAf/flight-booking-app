// sevices use the repository to interact with databasse
const {AirplaneRepository} = require('../repositories');
const {AppError} = require('../utils');
const {StatusCodes} = require('http-status-codes');

const createAirplance = async (data)=>{
    const airplaneRepository = new AirplaneRepository();

    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if(error.name === 'SequelizeValidationError'){//this if-block handles validation for-client-bad-request
            let explanation = [];
            error.errors.forEach((err)=>{// the reason to ths loop is that, we want to handle all different fiedls-error which may happen, like email-validation, password-validation, which handle by default by sequelize, and we get those error-message by this loop; Note: its handle database-level-validation
                explanation.push(err.message);
            }); 
            
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError("Connot create a new Airplane object", StatusCodes.INTERNAL_SERVER_ERROR);//handle server-error
    }
};


module.exports ={
    createAirplance,
}