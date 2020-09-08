'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('user_rooms', [{
      room_id: 1,
      user_id: 1
    }, {
      room_id: 1,
      user_id: 2
    }, {
      room_id: 1,
      user_id: 3
    }, {
      room_id: 1,
      user_id: 4
    }, {
      room_id: 1,
      user_id: 5
    }, {
      room_id: 1,
      user_id: 6
    }, {
      room_id: 1,
      user_id: 7
    }, {
      room_id: 1,
      user_id: 8
    }, {
      room_id: 1,
      user_id: 9
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user_rooms');
  }
};
