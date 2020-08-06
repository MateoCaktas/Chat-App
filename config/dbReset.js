'use strict';

const db = require('./db');

db
  .sync({ force: true });
