'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const initializePassport = require('./middleware/auth');
const passport = require('passport');
const session = require('express-session');

const app = express();

app.use(session({ secret: 'mysecret' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./routes/api/index')(app, passport);
app.use(passport.authenticate('jwt', { session: false }));
app.use('/users', require('./routes/api/Users'));
app.use('/messages', require('./routes/api/Messages'));
app.use('/rooms', require('./routes/api/Rooms'));
app.use('/likes', require('./routes/api/Likes'));

app.get('/', (req, res) => {
  res.send('Welcome to home page!');
});

const PORT = process.env.PORT || 3000;

initializePassport(passport);
app.listen(PORT, console.log(`Server started on port ${PORT}`));
