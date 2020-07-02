const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const initializeConnection = require('./config/dbConnect');
const app = express();

const User = require('./models/User');

const initializePassport = require('./middleware/auth');

app.use(session({ secret: 'mysecret' }));
app.use(bodyParser.urlencoded({extended: false}))

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

require('./routes/api/index')(app, passport);

const PORT = process.env.PORT || 3000;

initializeConnection()
    .then(() => initializePassport(passport, User))
    .then(() => app.listen(PORT, console.log(`Server started on port ${PORT}`)))