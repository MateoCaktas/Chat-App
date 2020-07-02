const db = require('../config/db');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;

const saltRounds = 10;

const User = db.define('User', {
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    full_name: {
        type: Sequelize.STRING
    },
    password: Sequelize.STRING
}, {
    hooks: {
        beforeCreate: (user) => {
            user.full_name = `${user.first_name} ${user.last_name}`
            user.password = bcrypt.hashSync(user.password, saltRounds);
        }
    }
})

module.exports = User
