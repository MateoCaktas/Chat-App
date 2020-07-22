'use strict';

const bcrypt = require('bcrypt');
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'what.net';

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ where: { email } })
        .then(user => {
          if (!user) {
            return done(null, false);
          }

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        })
      .catch(err => console.log(err));
    })
  );

  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findByPk(jwtPayload.id)
      .then(user => {
        if (user) return done(null, user);
        return done(null, false);
      })
      .catch(err => done(err, false));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User
      .findByPk(id)
      .then(user => done(null, user));
  });
};
