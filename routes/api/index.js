'use strict';

const { signJwt, authenticateToken } = require('../../middleware/checkAuthentication');
require('dotenv').config()
// POST login metoda
module.exports = function (app, passport) {
  app.get('/login', (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/failure'
    })(req, res, next);
  });

  app.get('/dashboard', (req, res, next) => {
    console.log('Been to dashboard');

    const myJwt = signJwt(req.user);

    res.json({ myJwt });
  });

  app.get('/testToken', authenticateToken, (req, res, next) => {
    res.send('This is very much authenticated!');
  })
  app.get('/failure', (req, res) => {
    console.log('Been to failure');
    res.send('Fail');
  });
};
