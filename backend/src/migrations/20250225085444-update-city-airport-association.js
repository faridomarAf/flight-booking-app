'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {// to add forieg constraint
    await queryInterface.addConstraint('Airports', {
      //define constraint type
      type: 'FOREIGN KEY',
      name: 'city-fkey-constraint',
      fields:['cityId'],
      references: {
        table: 'Cities',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {// to remove the foreign contraint
    queryInterface.removeConstraint('Airports', 'city-fkey-constraint')
  }
};
