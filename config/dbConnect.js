const db = require('./db');
const User = require('../models/User');
const Room = require('../models/Room');

module.exports = function initializeConnection(){
    return db
        .sync({
            force: true
        })
        .then(() => {
            User.create({
                first_name: 'First',
                last_name: 'User',
                email: 'first.user@gmail.com',
                password: '123456'
            })
        })
        .then(() => {
            User.create({
                first_name: 'Second',
                last_name: 'User',
                email: 'second.user@gmail.com',
                password: '222222'
            })
        })
}