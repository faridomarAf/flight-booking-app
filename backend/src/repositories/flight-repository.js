const CrudRepository = require('./crud-repository');
const {Flight, Airplane, Airport, City} = require('../models');
const {Sequelize} = require('sequelize');
const db = require('../models');
const {addRowLockOnFlights} = require('./queries')


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

    //update number of seats
    async updateRemainingSeats(flightId, seats, decrease = true) {
        const transaction = await db.sequelize.transaction();

        try {
                    //applies a row-level lock
        await db.sequelize.query(addRowLockOnFlights(flightId));
        const flight = await Flight.findByPk(flightId);
    
        if (+decrease) {
            await flight.decrement('totalSeats', { by: seats }, {transaction: transaction});
        } else {
            await flight.increment('totalSeats', { by: seats }, {transaction: transaction});
        }

        await transaction.commit();
        await flight.reload(); //to get updated values
        return flight;

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    
};

module.exports = FlightRepository;