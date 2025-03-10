const {FlightRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const { AppError } = require('../utils');
const {Op} = require('sequelize');

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


/*
Get all Flights, this function is going to takes some filters as below:
. trips=> currentLocation->destination
. 
*/
const getAllFlights = async(query)=>{
    let customFilter = {};
    let sortFilter = [];

    //Filter for current location to travel-destination
    if(query.trips){//if the condition true, we will get as string like:=> [trips=MUM-DEL] in search-rul
        // to achive it [trips=MUM-DEL] in url
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        //TODO: add a check which "departureAirportId" and "arrivalAirportId" are not the same, if, it should retrun null or Error
    }

    // add filter based on min and max price
    if(query.price){
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between] : [minPrice , (maxPrice === undefined ? '100000': maxPrice)],
        }
    }

    //add filter for number of travellers
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    //add filter based on same Date
    if(query.tripDate){
        customFilter.departureTime = {
            [Op.startsWith]: query.tripDate.split(" ")[0]
        }
    }
    
    // add sort-filter
    if(query.sort){
        const params = query.sort.split(",");
        const sortFilters = params.map((param)=> param.split("_"));
        sortFilter = sortFilters
    }


    const flightRepository = new FlightRepository();

    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
        
        throw new AppError('Cannot fetch data of all the Flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};


const getFlight = async(id)=>{
    const flightRepository = new FlightRepository();

    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if(error.statusCode === StatusCodes.NOT_FOUND){
            throw new AppError('The Flight that you requested is not found!', error.statusCode);
        }
        throw new AppError('Cannot fetch of the Flight by its ID!', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

//Update the flight seats
const updateSeats = async(data)=>{
    const flightRepository = new FlightRepository();
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.decrease);
        return response;
    } catch (error) {
        throw new AppError('Cannot update data of the Fligh!', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};


module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}