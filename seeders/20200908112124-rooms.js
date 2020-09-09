'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('rooms', [{
      creation_time: new Date(Date.now()),
      name: 'First Room',
      limit: 10
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rooms');
  }
};
