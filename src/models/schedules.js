'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    static associate({ allCode }) {
      Schedules.belongsTo(allCode,
        {
          foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeData'
        })
    }
  }
  Schedules.init({
    currentNumber: DataTypes.INTEGER,
    maxNumber: DataTypes.INTEGER,
    date: DataTypes.DATE,
    timeType: DataTypes.STRING,
    doctorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedules',
  });
  return Schedules;
};