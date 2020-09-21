'use strict';

const { Model } = require('sequelize');

class UserLikes extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        message_id: {
          type: DataTypes.INTEGER,
          references: 'Message',
          referencesKey: 'id',
          primaryKey: true
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: 'User',
          referencesKey: 'id',
          primaryKey: true
        }
      },
      {
        tableName: 'user_likes',
        underscored: true,
        sequelize
      }
    );
  }
}

module.exports = UserLikes;
