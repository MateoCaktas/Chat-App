'use strict';

const db = require('./db');
const dbSeed = require('./dbSeed');

module.exports = function connectDB() {
  return db
    .sync({
      force: true
    })
    .then(() => dbSeed());
};
