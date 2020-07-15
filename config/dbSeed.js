'use strict';

const Message = require('../models/Message');
const Room = require('../models/Room');
const User = require('../models/User');
const Users = require('../users.json');

var usersPromise = [];

module.exports = function dbSeed2() {
  Users.forEach(user => {
    usersPromise.push(User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    }));
  });

  return Promise
    .all(usersPromise)
    .then(usersPromise => createRoom(Date.now(), 'First Room', 10, usersPromise))
    .then(([room, users]) => {
      var message1 = createMessage(Date.now(), 'This is first user\'s message.', users[0], room);
      var message2 = createMessage(Date.now(), 'This is second message.', users[1], room);
      return Promise.all([message1, message2]);
    });
};

const createMessage = (time, content, user, room) => {
  return Message.create({
    time,
    content
  })
  .then(Message => Promise.all([
    Message.setUserMessage(user),
    Message.setMessageRoom(room)
  ]));
};

const createRoom = (creationTime, name, limit, users) => {
  return Room.create({
    creationTime,
    name,
    limit
  })
  .then(Room => {
    return Room
    .setBelongingUsers(users)
    .then(() => [Room, users]);
  });
};
