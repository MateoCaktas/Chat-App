'use strict';

module.exports = function (app, passport) {
  app.post('/login', passport.authenticate('local'), (req, res, next) => {
    const jwt = req.user.signJwt();
    res.json({ user: req.user.dataValues, jwt });
  });
};
