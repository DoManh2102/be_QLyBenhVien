'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin',
      password: '12345',
      firstName: 'đỗ',
      lastName: 'mạnh',
      address: 'VN',
      phoneNumber: '34555',
      gender: 0,
      image: 'img123',
      roleId: 'abc',
      positionId: 'bcd',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
