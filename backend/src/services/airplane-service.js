// sevices use the repository to interact with databasse

const {AirplaneRepository} = require('../repositories');

const createAirplance = async (data)=>{
    const airplaneRepository = new AirplaneRepository();

    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        throw error;
    }
};


module.exports ={
    createAirplance,
}