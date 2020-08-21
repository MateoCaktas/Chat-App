'use strict';

module.exports = function (req, res, next) {
  if (req.user.dataValues.isAdmin) next();
  else res.status(403).send('You are unauthorized.');
};
