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


const getAirplanes = async ()=>{
    const airplaneRepository = new AirplaneRepository();

    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        //here no need to handle validation error, be cause its just a get function
        throw new AppError("Connot fetch data of all airplanes!", StatusCodes.INTERNAL_SERVER_ERROR);//handle server-error
    }
}

const getAirplane = async (id)=>{
    const airplaneRepository = new AirplaneRepository();

    try {
        const ariplane = await airplaneRepository.get(id);
        return ariplane
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not found!', error.statusCode)
        }
        throw new AppError("Connot fetch data of airplane by ID", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

//To delete the airplane
const destroy = async (id)=>{
    const airplaneRepository = new AirplaneRepository();
    try {
        const response = await airplaneRepository.destroy(id);
        return response
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested to delete is not found!', error.statusCode)
        }
        throw new AppError('Cannot delete the airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports ={
    createAirplance,
    getAirplanes,
    getAirplane,
    destroy,
}