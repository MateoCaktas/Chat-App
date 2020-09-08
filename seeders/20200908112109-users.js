'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    function getFullName(firstName, lastName) {
      return firstName + ' ' + lastName;
    }

    return queryInterface.bulkInsert('users', [
      {
        first_name: 'First',
        last_name: 'User',
        email: 'first.user@gmail.com',
        password: bcrypt.hashSync('123456', saltRounds),
        is_admin: true,
        full_name: getFullName('First', 'User')
      },
      {
        first_name: 'Second',
        last_name: 'User',
        email: 'second.user@gmail.com',
        password: bcrypt.hashSync('222222', saltRounds),
        is_admin: false,
        full_name: getFullName('Second', 'User')
      },
      {
        first_name: 'Third',
        last_name: 'User',
        email: 'third.user@gmail.com',
        password: bcrypt.hashSync('333333', saltRounds),
        is_admin: true,
        full_name: getFullName('Third', 'User')
      },
      {
        first_name: 'Fourth',
        last_name: 'User',
        email: 'fourth.user@gmail.com',
        password: bcrypt.hashSync('444444', saltRounds),
        is_admin: false,
        full_name: getFullName('Fourth', 'User')
      },
      {
        first_name: 'Fifth',
        last_name: 'User',
        email: 'fifth.user@gmail.com',
        password: bcrypt.hashSync('555555', saltRounds),
        is_admin: false,
        full_name: getFullName('Fifth', 'User')
      },
      {
        first_name: 'Sixth',
        last_name: 'User',
        email: 'sixth.user@gmail.com',
        password: bcrypt.hashSync('666666', saltRounds),
        is_admin: false,
        full_name: getFullName('Sixth', 'User')
      },
      {
        first_name: 'Seventh',
        last_name: 'User',
        email: 'seventh.user@gmail.com',
        password: bcrypt.hashSync('777777', saltRounds),
        is_admin: true,
        full_name: getFullName('Seventh', 'User')
      },
      {
        first_name: 'Eighth',
        last_name: 'User',
        email: 'eighth.user@gmail.com',
        password: bcrypt.hashSync('888888', saltRounds),
        is_admin: false,
        full_name: getFullName('Eighth', 'User')
      },
      {
        first_name: 'Ninth',
        last_name: 'User',
        email: 'ninth.user@gmail.com',
        password: bcrypt.hashSync('999999', saltRounds),
        is_admin: false,
        full_name: getFullName('Ninth', 'User')
      }
    ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users');
  }
};
