'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('messages', [{
      time: new Date(Date.now()),
      content: 'This is first user\'s message.',
      f_k_user: 1,
      f_k_room: 1
    }, {
      time: new Date(Date.now()),
      content: 'This is second user\'s message.',
      f_k_user: 2,
      f_k_room: 1
    }, {
      time: new Date(Date.now()),
      content: 'This is third user\'s message.',
      f_k_user: 3,
      f_k_room: 1
    }, {
      time: new Date(Date.now()),
      content: 'This is fourth user\'s message.',
      f_k_user: 4,
      f_k_room: 1
    }, {
      time: new Date(Date.now()),
      content: 'This is fifth user\'s message.',
      f_k_user: 5,
      f_k_room: 1
    }, {
      time: new Date(Date.now()),
      content: 'This is sixth user\'s message.',
      f_k_user: 6,
      f_k_room: 1
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDlete('messages');
  }
};
