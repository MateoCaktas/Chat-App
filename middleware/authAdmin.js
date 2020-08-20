'use strict';

const db = require('../config/db');

function authAdmin(req, res, next) {
  const User = getUser(req.user.dataValues.id);

  User
    .then(user => {
      if (user.isAdmin) next();

      else res.status(403).send('You are unauthorized.');
    })
    .catch(err => res.status(400).send(err));
}

function checkIfAdminOrUser(req, res, next) {
  const User = getUser(req.user.dataValues.id);

  User
    .then(user => {
      req.isAdmin = user.isAdmin;

      next();
    })
    .catch(err => res.status(400).send(err));
}

function getUser(id) {
  return db.models.User.findOne({
    where: {
      id
    }
  });
}

module.exports = {
  authAdmin,
  checkIfAdminOrUser
};
