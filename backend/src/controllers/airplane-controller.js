const {AirplaneService} = require('../services');
const {StatusCodes} = require('http-status-codes');


const createAirplane = async (req, res)=>{
    const {modelNumber, capacity} = req.body;

    try {
        const airplane = await AirplaneService.createAirplance({
            modelNumber,
            capacity
        });

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Request successfully completed!",
            data: airplane,
            error: {}
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Could not create the airplane object!",
            data: {},
            error: error
        });
    }
};

module.exports ={
    createAirplane,
    
}