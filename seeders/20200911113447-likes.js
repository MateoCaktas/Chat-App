'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_likes', [{
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_likes');
  }
};
