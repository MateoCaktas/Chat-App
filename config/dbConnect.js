'use strict';

const db = require('./db');
const dbSeed = require('./dbSeed');

console.log('Connected DB');
db
  .sync({
    force: true
  })
  .then(() => dbSeed());
