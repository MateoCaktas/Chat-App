'use strict';

const Message = require('../models/Message');
const Room = require('../models/Room');
const User = require('../models/User');
const Users = require('../users.json');

module.exports = function dbSeed() {
  var usersPromise = Users.map(user => User.create(user));

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
  .then(message => Promise.all([
    message.setUserMessage(user),
    message.setMessageRoom(room)
  ]));
};

const createRoom = (creationTime, name, limit, users) => {
  return Room.create({
    creationTime,
    name,
    limit
  })
  .then(room => {
    return room
    .setBelongingUsers(users)
    .then(() => [room, users]);
  });
};
