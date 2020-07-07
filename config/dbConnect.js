'use strict';

const db = require('./db');
const Message = require('../models/Message');
const Room = require('../models/Room');
const User = require('../models/User');

module.exports = function connectDB() {
  return db
    .sync({
      force: true
    })
    .then(() => {
      return User.create({
        firstName: 'First',
        lastName: 'User',
        email: 'first.user@gmail.com',
        password: '123456'
      });
    })
    .then(() => {
      return User.create({
        firstName: 'Second',
        lastName: 'User',
        email: 'second.user@gmail.com',
        password: '222222'
      });
    })
    .then(() => {
      return Room.create({
        creationTime: Date.now(),
        name: 'First Room',
        limit: 10
      })
      .then(room => {
        return room.setBelongingUsers([1, 2]);
      });
    })
    .then(() => {
      return User.create({
        firstName: 'Third',
        lastName: 'User',
        email: 'second.user@gmail.com',
        password: '333333'
      })
      // Adding data in the third table because of N:M relation
      .then(user => {
        return user.setChatRooms(1);
      });
    })
    .then(() => {
      return Message.create({
        FK_user: 1,
        FK_room: 1,
        time: Date.now(),
        content: 'This is a message.'
      });
    })
    .then(() => {
      return Message.create({
        FK_user: 2,
        FK_room: 1,
        time: Date.now(),
        content: 'This is second user\'s response'
      });
    });
};
