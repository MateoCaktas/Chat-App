'use strict';

const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
const saltRounds = 10;

class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        full_name: DataTypes.STRING,
        password: DataTypes.STRING
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.ChatRooms = this.belongsToMany(models.Room, { as: 'ChatRooms', through: 'UserRooms' });
  }

  static hooks() {
    this.addHook('beforeCreate', user => {
      user.full_name = `${user.first_name} ${user.last_name}`;
      user.password = bcrypt.hashSync(user.password, saltRounds);
    });
  }
}

module.exports = User;
