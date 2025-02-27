const CrudRepository = require('./crud-repository');
const {Flight} = require('../models');

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight);
    }

    // To filter customers request for Flights searching
    async getAllFlights (filter){
        const response = await Flight.findAll({
            where: filter
        });
        return response
    };
};

module.exports = FlightRepository;