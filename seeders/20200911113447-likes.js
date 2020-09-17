'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_likes', [{
      message_id: 1,
      user_id: 1
    }, {
      message_id: 1,
      user_id: 2
    }, {
      message_id: 2,
      user_id: 4
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_likes');
  }
};
