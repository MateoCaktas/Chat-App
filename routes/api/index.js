'use strict';

module.exports = function (app, passport) {
  app.post('/login', passport.authenticate('local'), (req, res) => {
    const jwt = req.user.signJwt();
    res.json({ user: req.user.dataValues, jwt });
  });
};
