const passport = require('passport');

module.exports = (app) => {
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
},
(accessToken, refreshToken, profile, done) => {

}));

app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/surveys');
    }
);

app.get('/api/logout', (req, resp) => {
    req.logout();
    resp.redirect('/');
});

app.get('/api/current-user', (req, resp) => {
    resp.send(req.user);
});
};
