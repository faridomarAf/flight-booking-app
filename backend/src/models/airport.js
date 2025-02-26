'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City,{
        foreignKey: 'cityId',
        onDelete: 'CASCADE',
        // onUpdate: 'CASCADE'
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
  }
  Airport.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type:DataTypes.STRING,
      unique: true
    },
    cityId: {
      type:DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};