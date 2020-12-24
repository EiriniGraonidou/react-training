const express = require('express');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport')

const app = express();
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieEncryptionKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./models/Users');
require('./services/passport');
const mongoose = require('mongoose');

mongoose.connect(keys.mongoURI);


const PORT = process.env.PORT || 5050;
app.listen(PORT);