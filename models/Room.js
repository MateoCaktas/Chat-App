'use strict';

const { Model } = require('sequelize');

class Room extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        creation_time: {
          type: DataTypes.DATE
        },
        name: DataTypes.STRING,
        limit: DataTypes.INTEGER
      },
      {
        tableName: "rooms",
        sequelize
      }
    );
  }

  static associate(models) {
    this.BelongingUsers = this.belongsToMany(models.User, { as: 'BelongingUsers', through: 'userrooms' });
  }
}

module.exports = Room;
