'use strict';

module.exports = function (app, passport) {
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/failure'
  }));

  app.get('/dashboard', (req, res) => {
    res.send('Success');
  });

  app.get('/failure', (req, res) => {
    res.send('Fail');
  });
};
