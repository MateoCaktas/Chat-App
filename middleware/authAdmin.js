'use strict';

const db = require('../config/db');

module.exports = function (req, res, next) {
  db.models.User.findOne({
    where: {
      id: req.user.dataValues.id
    }
  })
    .then(user => {
      req.isAdmin = user.isAdmin;

      next();
    })
    .catch(err => res.status(400).send(err));
};
