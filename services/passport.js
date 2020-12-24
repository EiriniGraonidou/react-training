const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then(user => {
        done(null, user);
    })
})
passport.use(
    new GoogleStrategy({        
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,          
        callbackURL: '/auth/google/callback'

    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
            .then((foundUser) => {
                if (!foundUser) {
                    new User({googleId: profile.id})
                    .save()
                    .then(user => {
                        done(null, user);
                    });
                }
                done(null, foundUser);
            })
        
        
    })
);