const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport')
const bodyParser = require('body-parser');
const app = express();
mongoose.connect(keys.mongoURI);

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieEncryptionKey]
    })
);

// middleware adds request body to the req object and makes it available to us.
app.use(bodyParser.json()); 
app.use(passport.initialize());
app.use(passport.session());


require('./models/Users');
require('./models/Survey');
require('./services/passport');


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 5050;
app.listen(PORT);