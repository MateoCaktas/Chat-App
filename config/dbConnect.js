'use strict';

const db = require('./db');
const Room = require('../models/Room');
const User = require('../models/User');

module.exports = function connectDB() {
  return db
    .sync({
      force: true
    })
    .then(() => {
      User.create({
        first_name: 'First',
        last_name: 'User',
        email: 'first.user@gmail.com',
        password: '123456'
      });
    })
    .then(() => {
      User.create({
        first_name: 'Second',
        last_name: 'User',
        email: 'second.user@gmail.com',
        password: '222222'
      });
    })
    .then(() => {
      Room.create({
        creation_time: Date.now(),
        name: 'First Room',
        limit: 10
      });
    });
};
