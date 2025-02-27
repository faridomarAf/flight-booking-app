const {FlightRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const { AppError } = require('../utils');

const createFlight = async (data) => {

    // Validate departureTime and arrivalTime
    const departureTime = new Date(data.departureTime);
    const arrivalTime = new Date(data.arrivalTime);

    if (departureTime >= arrivalTime) {
        throw new AppError(
            "Departure time must be earlier than arrival time",
            StatusCodes.BAD_REQUEST
        );
    }

    const flightRepository = new FlightRepository();
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });

            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new Flight object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
};


module.exports = {
    createFlight
}