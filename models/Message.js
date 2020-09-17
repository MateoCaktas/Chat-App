'use strict';

const { Model } = require('sequelize');

class Message extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        time: {
          type: DataTypes.DATE
        },
        content: {
          type: DataTypes.STRING
        }
      },
      {
        tableName: 'messages',
        underscored: true,
        sequelize
      }
    );
  }

  static associate(models) {
    this.MessageRoom = this.belongsTo(models.Room, { as: 'messageRoom', foreignKey: 'FK_room' });
    this.UserMessage = this.belongsTo(models.User, { as: 'userMessage', foreignKey: 'FK_user' });
    this.UserLikes = this.belongsToMany(models.User, { as: 'userLikes', through: 'user_likes' });
  }
}

module.exports = Message;
