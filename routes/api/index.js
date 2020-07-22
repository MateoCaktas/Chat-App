'use strict';

module.exports = function (app, passport) {
  app.post('/login', passport.authenticate('local'), (req, res, next) => {
    const myJwt = req.user.signJwt();
    res.json({ myJwt });
  });
};
