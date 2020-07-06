'use strict';

const db = require('../config/db');
const Sequelize = require('sequelize/types');

const Message = db.define('User', {
  time: {
    type: Sequelize.DATE
  },
  content: {
    type: Sequelize.STRING
  }
});

module.exports = Message;
