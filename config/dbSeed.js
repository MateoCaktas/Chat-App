'use strict';

require('./db');
const Message = require('../models/Message');
const Room = require('../models/Room');
const User = require('../models/User');
const Users = require('../users.json');

function dbSeed() {
  var usersPromise = Users.map(user => User.create(user));

  return Promise
    .all(usersPromise)
    .then(usersPromise => createRoom(Date.now(), 'First Room', 10, usersPromise))
    .then(([room, users]) => {
      var message1 = createMessage(Date.now(), 'This is first user\'s message.', users[0], room);
      var message2 = createMessage(Date.now(), 'This is second user\'s message.', users[1], room);
      var message3 = createMessage(Date.now(), 'This is third user\'s message.', users[2], room);
      var message4 = createMessage(Date.now(), 'This is fourth user\'s message.', users[3], room);
      var message5 = createMessage(Date.now(), 'This is fifth user\'s message.', users[4], room);
      var message6 = createMessage(Date.now(), 'This is sixth user\'s message.', users[5], room);
      return Promise.all([message1, message2, message3, message4, message5, message6]);
    });
}

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

dbSeed();
