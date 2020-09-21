'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('rooms', [{
      creation_time: new Date(Date.now()),
      name: 'First Room',
      limit: 10
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rooms');
  }
};
