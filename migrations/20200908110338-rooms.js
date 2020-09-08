'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('rooms', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      creation_time: {
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING
      },
      limit: {
        type: Sequelize.INTEGER
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rooms');
  }
};
