'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_likes', {
      message_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'messages',
          key: 'id'
        },
        primaryKey: true,
        allowNull: false,
        onDelete: 'CASCADE'
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        primaryKey: true,
        allowNull: false,
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_likes');
  }
};
