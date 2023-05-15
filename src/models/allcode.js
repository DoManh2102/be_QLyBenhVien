'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class allCode extends Model {
    static associate({ User, Schedules }) {
      allCode.hasMany(User, { foreignKey: 'positionId', as: 'positionData' })
      allCode.hasMany(User, { foreignKey: 'gender', as: 'genderData' })
      allCode.hasMany(Schedules, { foreignKey: 'timeType', as: 'timeTypeData' })
    }
  }
  allCode.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    value_EN: DataTypes.STRING,
    value_VI: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'allCode',
  });
  return allCode;
};