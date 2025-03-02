const CrudRepository = require('./crud-repository');
const {Flight, Airplane, Airport, City} = require('../models');
const {Sequelize} = require('sequelize');

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight);
    }

    // To filter customers request for Flights searching
    async getAllFlights (filter, sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include:[
            {// joint to show airplane-details
                model: Airplane,
                required: true,
                as: 'ariplane_details'
            },
            {
                model: Airport,
                required: true,
                as: 'departure_airport',
                on : {
                    col1 : Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departure_airport.code"))
                },
                include :{
                    model: City,
                    required: true
                }
            },
            {
                model: Airport,
                required: true,
                as: 'arrival_airport',
                on : {
                    col1 : Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrival_airport.code"))
                },
                include :{
                    model: City,
                    required: true
                }
            }
        ]
        });
        return response
    };
};

module.exports = FlightRepository;