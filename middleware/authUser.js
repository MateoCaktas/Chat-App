'use strict';

function authAdmin(req, res, next) {
  if (req.user.isAdmin) next();
  else res.status(403).send('You are unauthorized.');
}

function authUser(req, res, next) {
  if (req.user.isAdmin || req.user.id === parseInt(req.params.userId)) next();
  else res.status(403).send('You are unauthorized to delete this user.');
}

module.exports = {
  authAdmin,
  authUser
};
