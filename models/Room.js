'use strict';

const { Model } = require('sequelize');

class Room extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        creationTime: {
          type: DataTypes.DATE
        },
        name: {
          type: DataTypes.STRING
        },
        limit: {
          type: DataTypes.INTEGER
        }
      },
      {
        tableName: 'rooms',
        underscored: true,
        sequelize
      }
    );
  }

  static associate(models) {
    this.BelongingUsers = this.belongsToMany(models.User, { as: 'BelongingUsers', through: 'user_rooms' });
  }
}

module.exports = Room;
