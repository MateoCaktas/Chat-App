'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    Promise.all([
      queryInterface.createTable('Users', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        }
      }),
      queryInterface.createTable('Rooms', {
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
      }),
      queryInterface.createTable('Messages', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        f_k_user: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        f_k_room: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Rooms',
            key: 'id'
          }
        }
      })
    ]);

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.dropTable('Messages'),
      queryInterface.dropTable('Users'),
      queryInterface.dropTable('Rooms')
    ]);
  }
};
