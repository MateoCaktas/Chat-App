'use strict';

const { signJwt } = require('../../middleware/checkAuthentication');

module.exports = function (app, passport) {
  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/failure'); }

      req.logIn(user, function (err) {
        if (err) { return next(err); }
        return res.redirect('/dashboard');
      });
    })(req, res, next);
  });

  app.get('/dashboard', (req, res, next) => {
    const myJwt = signJwt(req.user);
    res.json({ myJwt });
  });

  app.get('/failure', (req, res) => {
    res.send('Fail');
  });
};
