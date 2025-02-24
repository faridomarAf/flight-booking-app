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

