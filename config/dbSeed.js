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
    Promise.all([room1, user1, user2]).then(data => {
      const [room1, ...users] = data;
      Message.create({
        time: Date.now(),
        content: 'This is first user\'s message.'
      })
      .then(Message => {
        Message.setUserMessage(users[0]);
        Message.setMessageRoom(room1);
      });

      Message.create({
        time: Date.now(),
        content: 'This is second user\'s response'
      })
      .then(Message => {
        Message.setUserMessage(users[1]);
        Message.setMessageRoom(room1);
      });
    });
  } catch (err) {
    console.log(err);
  }
};
