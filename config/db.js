'use strict';

const Sequelize = require('sequelize');

const db = new Sequelize('chatapp', 'Admin', '', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;
