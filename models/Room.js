'use strict';

const db = require('../config/db');
const Sequelize = require('sequelize');

const Room = db.define('Room', {
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

module.exports = Room;
