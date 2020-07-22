'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Model } = require('sequelize');
const saltRounds = 10;

class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        firstName: {
          type: DataTypes.STRING
        },
        lastName: {
          type: DataTypes.STRING
        },
        email: {
          type: DataTypes.STRING
        },
        fullName: {
          type: DataTypes.STRING
        },
        password: {
          type: DataTypes.STRING
        }
      },
      {
        tableName: 'users',
        underscored: true,
        sequelize
      }
    );
  }

  static associate(models) {
    this.ChatRooms = this.belongsToMany(models.Room, { as: 'ChatRooms', through: 'user_rooms' });
  }

  signJwt() {
    const email = this.email;
    const id = this.id;
    const user = { email, id };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    return accessToken;
  }

  static hooks() {
    this.addHook('beforeCreate', user => {
      user.fullName = `${user.firstName} ${user.lastName}`;
      user.password = bcrypt.hashSync(user.password, saltRounds);
    });

    this.addHook('beforeUpdate', user => {
      user.fullName = `${user.firstName} ${user.lastName}`;
    });
  }
}

module.exports = User;
