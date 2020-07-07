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
    this.messageRoom = this.belongsTo(models.Room, { as: 'messageRoom', foreignKey: 'FK_room' });
    this.userMessage = this.belongsTo(models.User, { as: 'userMessage', foreignKey: 'FK_user' });
  }
}

module.exports = Message;
