'use strict';

const Message = require('../models/Message');
const Room = require('../models/Room');
const User = require('../models/User');

module.exports = async function dbSeed() {
  try {
    const user1 = User.create({
      firstName: 'First',
      lastName: 'User',
      email: 'first.user@gmail.com',
      password: '123456'
    });

    const user2 = User.create({
      firstName: 'Second',
      lastName: 'User',
      email: 'second.user@gmail.com',
      password: '222222'
    });

    const user3 = User.create({
      firstName: 'Third',
      lastName: 'User',
      email: 'third.user@gmail.com',
      password: '333333'
    });

    const room1 = Room.create({
      creationTime: Date.now(),
      name: 'First Room',
      limit: 10
    });

    Promise.all([room1, user1, user2, user3]).then(data => {
      const [room, ...users] = data;
      room.setBelongingUsers(users);
    });

    // Create messages only after user1 and user2 are created
    Promise.all([user1, user2]).then(users => {
      Message.create({
        FK_user: 1,
        FK_room: 1,
        time: Date.now(),
        content: 'This is first user\'s message.'
      });

      Message.create({
        FK_user: 2,
        FK_room: 1,
        time: Date.now(),
        content: 'This is second user\'s response'
      });
    });
  } catch (err) {
    console.log(err);
  }
};
