============================= Flight booking application =============
the whole applicatin is a micro-service application.

1: people could get an end-to-end flight booking
2: they could search for flight integerated with data selection, 
number of persons, 
class: Economy, Premium economy, Business, First
they could select the starting desitination, and end distination
and finally search for that

2: we should have different filter choice:
. number of stops
. airlines
. bagages
. price range
. time range

3: we should have the sort option:
. by price
. duration time
. arival time

4: adding constraints:
. if there is one set, customer should not allowed to book 3 sets
. price calculation for sets
. sending notification once custorme booked the flight
. 48 hours before flight time, customer should complete his online boarding
. after completing boarding, mail ticket to custormer
. option to cancel the boarding
. update user regarding any delay in flight time

================================= After our first curd adding airplane : First step ============================

1: we created airplane-middleware to handle the correct error of 400-bad request instead of 500 which was by default, which occurs when the use send null-value for 'modelNumber' or wrong format of input.

Why we did that:
. because the 'null value or wrong format is a client mistacke or a bad request its not a server errror that should error with status-code of 500, it should error with status-code of-400 which is a bad-request status-code'.

2: create error-class 'app-error.js' which is an app-erro-class at: utils/errors
why we did that:
. to make the error-response more consistence, while many number of dev work on the same project there should not be different error response which cause confiusion.

3: create error-response && success-response object insid the: utils/common directory
why we did that:
. to avoid writing raw message in our application

================================= Second step ============================

1: created the seeders file: inside seeeders directory,

why we do that: 
seeder-files used to : populating the database with initial or test data.
Use Case: nitializing Data, Testing, Development, Demo Environments

use this command to initialize seeder-file:=> px sequelize seed:generate --name add-airplane [it will create a seed-file with the name of add-airplane].

we should modify our seed-file regarding to our database-structure, below is an example:

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Airplanes',[
      {
        modelNumber: 'airbus380',
        capacity: 900,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'airbus390',
        capacity: 800,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Airplanes',
    {[Op.or]: [
      {modelNumber: 'airbus390'},
      {modelNumber: 'airbus380'},
    ]})
  }
};



. run this command to apply all seed-files to database:=> [npx sequelize db:seed:all]
. to undo all seeded files run this commond: [npx sequelize db:seed:undo:all]


================================= third step:=>  ============================
timeline minutes: 2:11

. crud-repository modified, try-catch removed from the code-file, because the error-hanldling logic would be handling in service-files

1: add the getAriplanes service, getAirplanes to the controller, getAirplanes to the routes.
2: add the getAriplane by ID service, getAirplane to the controller, getAirplane to the routes.
2: add the updateAriplane  service, getAirplane to the controller, getAirplane to the routes.
2: add the deleteAriplane service, getAirplane to the controller, getAirplane to the routes.

================================= 4 step:=> add city model 2:37 ============================
1: to create city model:=> npx sequelize model:generate --name City --attributes name:string
2: to add city model to db:=> npx sequeliz db:migrate

. create route for city done
. updated route for city done
. get all-cities route done
. get city-by-Id route done
. delete route for city done
. create cityMiddleware, Note:=> although with out middle ware our route handling the null-error for create-city-route, but when there is a null empty-value, it gos to ->city-service -> city-repository -> database, then it check for null empty-value and error for null value, instead of all these steps we can handle the null-value error at first step in city controller, by creating the 'cityMiddleware' we can handle it at this step, if there is null-value it throw error, and no need to do more process.

================================= 5 step:=> Airports model ============================
Properties of aiports: airportName, ariport_address, unique_airport_code, cityId, note: cityId is act as a foreign-key
. Note: the ariport model is our first 'one to many association', 

1: to create airport model:=>  npx sequelize model:generate --name Airport --attributes name:string,code:string,address:string,cityId:integer

2: to add city model to db:=> npx sequeliz db:migrate

. Note: in order to mapping between "city" and "airport", from [city model migration file] we should take 'id' as a foreign-key and add it to the [airport migration file], we should associate it with "cityId inside the airport migration file".

  cityId: { // cityId will be our foreign key in airport-model, but currently its not a foreing-key
    type: Sequelize.INTEGER,
    allowNull: false,
  }

How to associate it? :=> 

. first if we check our Airports model:=> using ' show databases; -> use Fligthts; -> show tables; -> desc Airports;' the output is as below, "cityId is just a raw integer"

+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int          | NO   | PRI | NULL    | auto_increment |
| name      | varchar(255) | NO   | UNI | NULL    |                |
| code      | varchar(255) | NO   | UNI | NULL    |                |
| address   | varchar(255) | YES  | UNI | NULL    |                |
| cityId    | int          | NO   |     | NULL    |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+

NOW: How to associate it? :=> with foreign key:
. we should make a database level change,
. to make a database level change, we should update the Airport model as below:
. to update Airport-model, it will create a new updated migration-file for airport in migrations-repository
  :=> npx sequelize migration:generate --name update-city-airport-association

=> the created migration file as below:

module.exports = {
  async up (queryInterface, Sequelize) {

  },

  async down (queryInterface, Sequelize) {

  }
};

. now we should define our code in migration file, which what exactly should happen as below:

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports', {// 'Airports' is name of airplane-model
      //define constraint type
      type: 'FOREIGN KEY',
      name: 'city-fkey-constraint', // this a custom name of "contraint" which then use for 'async down function' when delete migration
      fields:['cityId'],// we want [cityId field in our airport model which to add foreign key]
      references: {// from which mode and wich field foreign-key should be taken?
        model: 'Cities',
        key: 'id'
      },
      onUpdate: 'CASCADE', // CASCADE-value means which if any changes happen in [Cities model] it should update also in [Airports model at cityId] also
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Airports', 'city-fkey-constraint')
  }
};



3: now to add foreign-key to airport-model:=> npx sequelize db:migrate
. now if we check :=> desc Airports

+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int          | NO   | PRI | NULL    | auto_increment |
| name      | varchar(255) | NO   | UNI | NULL    |                |
| code      | varchar(255) | NO   | UNI | NULL    |                |
| address   | varchar(255) | YES  | UNI | NULL    |                |
| cityId    | int          | NO   | MUL | NULL    |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
you can see changes of foreign key in this line: cityId has a key-value which is foreign-key


4: now we should apply some constraint also at javascript-leve, becuase the previous contraints was all in database-level.

. HOW TO DO THAT?
. in modesls repository in airport.js file, we can apply the javascript-level constraint at this prart of the code:

  static associate(models) {
    // define association here
  }

  it should update like this:

    static associate(models) {
      // define association here
      this.belongsTo(models.City,{
        foreignKey: 'cityId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Flight,{// at any point of time if you want to get all the flights thats are goig to fly from an airport, we can easily get that by this code
        foreignKey:'departureAirportId',
        onDelete:'CASCADE'
      });
      this.hasMany(models.Flight,{// to get flights wich comming  to airport
        foreignKey:'arrivalAirportId',
        onDelete:'CASCADE'
      });
    }

  . now inside the city.js in models directory aslo we should update this port of the model: 

  static associate(models) {
    // define association here
  }

update as below:

  static associate(models) {// means city has many airports 
    // define association here
    this.hasMany(models.Airport,{
      foreignKey: 'cityId'
    })
  }


================================= 6 step:=> Flight model ============================

1: now lets create a Flight-model,
How to do that:=> npx sequelize model:generate --name Flight --attributes flightNumber:string,airplaneId:integer,departureAirportId:integer,arrivalAirportId:integer,arrivalTime:date,departureTime:date,price:integer,boardingGate:string,totalSeats:integer 

. NOW, after creating the Flight-model, we should update our flight-migration file, its ariplaneId as below:
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          table:'Airplanes',
          field:'id'
        },
        onDelete:'CASCADE'
      }, it would add the [field:'id'] as a foreign-key to our Flight-model.

we do the same modification for:

      departureAirportId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          table:'Airports',
          field:'code'// it is as a foreign-key
        },
        onDelete:'CASCADE'
      },
      arrivalAirportId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          table:'Airports',
          field:'code'// it is as a foreign-key
        },
        onDelete:'CASCADE'
      },

. also we should modify the "static associate" of our flight model in [models directory] as below:

from this version:

    static associate(models) {
      // define association here
    }

should change to this:

    static associate(models) {
      this.belongsTo(models.Airplane, {// [Airplane is the class name of airplane.js in models directory same directory]
        foreignKey:'airplaneId'// this [airplaneId] in the airplane-migration file, referenced to the [Airports migration file]
      });
      this.belongsTo(models.Airport,{
        foreignKey:'departureAirportId'
      });
      this.belongsTo(models¯.Airport,{
        foreignKey:'arrivalAirportId'
      });
    }



. also we need to do modification in [airplane.js file] in models-directory as well,
before:

    static associate(models) {
      // define association here
    }

after modification:

    static associate(models) {
      // define association here
      this.hasMany(models.Flight, {
        foreignKey:'airplaneId',
        onDelete:'CASCADE'
      })
    }
NOTE: these association and foreign-key are because of that, if an airplane deleted from databases, no flights for that airplane should exist


Note: we have three associations, based on three different models,[airplane, airport, flight],

2: now lets migrate our models to database:=> npx sequelize db:migrate

. now if we check:=> show tables:
| Tables_in_fligthts |
+--------------------+
| Airplanes          |
| Airports           |
| Cities             |
| Flights            |
| SequelizeMeta      |
+--------------------+ we have our tables

to describe the 'Flights' model:=> desc Flights:
| Field              | Type         | Null | Key | Default | Extra          |
+--------------------+--------------+------+-----+---------+----------------+
| id                 | int          | NO   | PRI | NULL    | auto_increment |
| flightNumber       | varchar(255) | NO   |     | NULL    |                |
| airplaneId         | int          | NO   | MUL | NULL    |                |this line we have our constraints
| departureAirportId | varchar(255) | NO   | MUL | NULL    |                |this line we have our constraints
| arrivalAirportId   | varchar(255) | NO   | MUL | NULL    |                |this line we have our constraints
| arrivalTime        | datetime     | NO   |     | NULL    |                |
| departureTime      | datetime     | NO   |     | NULL    |                |
| price              | int          | NO   |     | NULL    |                |
| boardingGate       | varchar(255) | YES  |     | NULL    |                |
| totalSeats         | int          | NO   |     | NULL    |                |
| createdAt          | datetime     | NO   |     | NULL    |                |
| updatedAt          | datetime     | NO   |     | NULL    |                |
+--------------------+--------------+------+-----+---------+----------------+

. now to check the constraints of each table we can use use the below command, tables like[Flights,Airplanes....]:
:=> select * from INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = "flights" and CONSTRAINT_SCHEMA = "flights";


================================= 7 step:=> create APIs for airport ============================

. all the crud-resources added for airport-routes

================================= 8 step:=> create APIs for flight ============================

. Note: the main agenda is that: to make sure the users are ables to see new flights, they be able to make some:  
[
  filters, they should be able to make different types of filters, 
  they should be able to arrange flights in 'assending' or 'dessending' mode
  ...
],

1: create flight-route API is completed.
. for this route at flight-service in createFlight-funtion we also hadled the logic of:
 [departure date is not later than or equal to the arrival date as below:
 
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
]

 2: add the [getAllFlights function] in  'flight-repository.js file' , in order to filter the customers requests regarding to flight-searching as below:

     async getAllFlights (filter){
        const response = await Flight.findAll({
            where: filter
        });
        return response
    };

2: create the getAllFlights in flight-service also, to add the logic of searching:

const getAllFlights = async(query)=>{
    let customFilter = {};

    if(query.trips){//if the condition true, we will get as string like:=> [trips=MUM-DEL] in search-rul
        // to achive it [trips=MUM-DEL] in url
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        //TODO: add a check which "departureAirportId" and "arrivalAirportId" are not the same, if, it should retrun null or Error
    }

    const flightRepository = new FlightRepository();

    try {
        const flights = await flightRepository.getAllFlights(customFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the Flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

. Now to use our getFlights route with it Search-functionality we do as Below:
[ 
  1: in postmant select the the "Params at left-corner-top"
  . key :=> trips
  . vlaue:=> DEL-MUM
  . the url would be like this: http://localhost:3500/api/v1/flights?trips=DEL-MUM
  . it would search all the Flights which, their 'departure-aiport' is [DEL, which is the code of Delhi-ariport] and arrivale-airport is [MUM which is the code of Mumbia-airport]
]


. Now lets make filter to get Flights based-on price filter, to do that, we need to use a custom-sequelize-operator to use its functionality, which is "Op" we should import it into our flight-service-file as below:
. [ const {Op} = require('sequelize'); ]

we add this condition to getAllFlights in flight-service-file, it would make us able to search flights based on pric-range:

    if(query.price){
        console.log(query.price);
        
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            //if user does not provide a maxPrice, it would automaticaly assign the maxPrice to 100000
            [Op.between] : [minPrice , (maxPrice === undefined ? '100000': maxPrice)],
        }
    }

  2: in postmant select the the "Params at left-corner-top"
  . key :=> price
  . vlaue:=> 5000-7500
  . it would only searh flight between these ranges:[5000-7500]


. Add filter based on Number of Travellers, number of travellers should always be equal or smaller than number of totalSets which are available, not greater,

    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]: query.travellers // [gte means greater or equal], means that totalSets should be greater of equal to number of travellers
        }
    }

. Add flter base on Date
     if(query.tripDate){
        customFilter.departureTime = {
            [Op.startsWith]: query.tripDate.split(" ")[0]// it change the date from this format ["2025-07-16T22:30:12.000Z which the date-format in data base] to this form [2025-07-16, which user sent it as a query]
        }
    }

. ===== Now let also apply some sorte functionality:

. To sort Flight based on price_ASC or price_DESC OR bassed-on departureTime_ASC or departureTime_DESC, we do the below steps:
. first add the sort query also to the [getAllFlights funciton inside the flight-repository.js file] as an argument.
. next: create a [sortFilter variable to hold the sort value in the getAllFlights-function in flight-service.js file] as below:
  let sortFilter = [];

  now create the condition:
     if(query.sort){
        const params = query.sort.split(",");// to separate the query in url with ","
        const sortFilters = params.map((param)=> param.split("_"));
        sortFilter = sortFilters
    }
. ============== Note, Regarding to Searching ===========================
. now that we applied the searching and sorting functionality to the getAllFlights-API, when we search flights, its only shows the flights by their General-Properties, consider the the search below:
-- we search for trips from DEL->to->BLR then the search result would be these general-information, nothing specific about airplane-object. 

        {
            "id": 1,
            "flightNumber": "UK 808",
            "airplaneId": 1,
            "departureAirportId": "MUM",
            "arrivalAirportId": "BLR",
            "arrivalTime": "2025-01-16T23:03:12.000Z",
            "departureTime": "2025-01-16T21:03:12.000Z",
            "price": 3500,
            "boardingGate": null,
            "totalSeats": 120,
            "createdAt": "2025-02-27T05:22:01.000Z",
            "updatedAt": "2025-02-27T05:22:01.000Z"
        }

-- So it should also shows the airplane-object regarding to its ["id": 1,] to achive that:

. in flight-repository.js, we can midify the 'getAllFlights-function and add joints to achive our goals' as below:

--1: we should require the Airpalne-Modle and Airport-model:
const {Airplane, Airport} = require('../models'); 

--2: include them to our getAllFlights-funciton:

    async getAllFlights (filter, sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include:[
             {
                model: Airplane,
                required: true,
                as: 'ariplane_details'// this is the name to be shown in search result istead of 'Airplane', in search result we should see [ariplane_details], 
                NOTE: we should also add it to ariplane_details to the flight.js model,
            },
            {
                model: Airport,
                required: true,
                as: 'departure_airport',// this is the name to be shown in search result istead of 'Airport', in search result we should see [departure_airport]
                on : {
                    col1 : Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departure_airport.code"))
                }
            },
        ]
        });
        return response
    };

. Now the search result would include also the ariplane-objcet and Airport-object with their infromation:
. we can include all 'properties which we referenced' if its need

        {
            "id": 1,
            "flightNumber": "UK 808",
            "airplaneId": 1,
            "departureAirportId": "MUM",
            "arrivalAirportId": "BLR",
            "arrivalTime": "2025-01-16T23:03:12.000Z",
            "departureTime": "2025-01-16T21:03:12.000Z",
            "price": 3500,
            "boardingGate": null,
            "totalSeats": 120,
            "createdAt": "2025-02-27T05:22:01.000Z",
            "updatedAt": "2025-02-27T05:22:01.000Z",
            "ariplane_details": {
                "id": 1,
                "modelNumber": "aribus480",
                "capacity": 330,
                "createdAt": "2025-02-22T09:58:54.000Z",
                "updatedAt": "2025-02-24T10:47:31.000Z"
            },
            "departure_airport": {
                "id": 14,
                "name": "CSI Airport",
                "code": "MUM",
                "address": null,
                "cityId": 8,
                "createdAt": "2025-02-26T11:14:56.000Z",
                "updatedAt": "2025-02-26T11:14:56.000Z"
            }
            // aslo we could have 'arrival_airport', as we did 'getAllFlights-function in flight-repository.js'
        }



=========================================================   Create Seat model  ========================================================
1: to create seat model:=> npx sequelize model:generate --name Seat --attributes airplaneId:integer,row:integer,col:string,type:string

2: add association to seat-model, we should add them to [seat-migration-file]

. A: a seat is belong to an airplane, and airplane has many seats, so, in migration file we have 'airplaneId' property, which we should reference it to the 'Airplane model' as below:

      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Airplanes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

. B: also we should make the reference in the [seat.js file] in models-directory, which a seat belongs to airplane
  we do that as below:

      static associate(models) {
      // define association here
      this.belongsTo(models.Airplane,{
        foreignKey: 'airplaneId'
      })
    }

. C: now we should also reference the airplane-model.js to the seat-model.js, we do that as below:

      this.hasMany(models.Seat,{
        foreignKey:'airplaneId',
        onDelete:'CASCADE'
      })
      
. NOTE: what type connection we have setup?, it on-to-many connection, which an airplane has many seats, seats belong to airplane


3: now lets add it to Database:=> npx sequelize db:migrate

