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