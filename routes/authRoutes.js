const passport = require('passport');

module.exports = (app) => {
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
},
(accessToken, refreshToken, profile, done) => {

}));

app.get('/auth/google/callback', passport.authenticate('google'));

app.get('/api/logout', (req, resp) => {
    req.logout();
    resp.send(req.user);
});

app.get('/api/current-user', (req, resp) => {
    resp.send(req.user);
});
};
