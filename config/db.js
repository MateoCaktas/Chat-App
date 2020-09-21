'use strict';

const forEach = require('lodash/forEach');
const invoke = require('lodash/invoke');
const Message = require('../models/Message');
const Room = require('../models/Room');
const Sequelize = require('sequelize');
const User = require('../models/User');
const UserLikes = require('../models/UserLikes');

const db = new Sequelize('chatapp', 'Admin', '', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const models = {
  Message: Message.init(db, Sequelize),
  Room: Room.init(db, Sequelize),
  User: User.init(db, Sequelize),
  UserLikes: UserLikes.init(db, Sequelize)
};

forEach(models, model => {
  invoke(model, 'associate', models);
  invoke(model, 'hooks');
});

module.exports = db;
