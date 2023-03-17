'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ allCode, Markdown_Editor }) {
      User.belongsTo(allCode, { foreignKey: 'positionId', as: 'positionData', targetKey: 'keyMap' })
      User.belongsTo(allCode, { foreignKey: 'gender', as: 'genderData', targetKey: 'keyMap' })
      User.hasMany(Markdown_Editor, { foreignKey: 'doctorId' })
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.BLOB,
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};