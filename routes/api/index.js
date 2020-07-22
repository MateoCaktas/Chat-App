'use strict';

const { signJwt } = require('../../middleware/checkAuthentication');

module.exports = function (app, passport) {
  app.post('/login', passport.authenticate('local'), (req, res, next) => {
    const myJwt = signJwt(req.user);
    res.json({ myJwt });
  });
};
