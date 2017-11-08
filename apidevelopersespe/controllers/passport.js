var LocalStrategy = require('passport-local').Strategy;
var modeldb = require('../models/model');
var User = modeldb.User;
var passport = require('passport');

passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    },
    function(name, password, done) {

        User.findOne({ 'local.name': name }).exec(function(err, user) {

            if (err)
            //console.log('erro pass o name if2');
                done(err);
            if (!user)

                return done(null, false /*, req.flash('loginMessage', 'No user found')*/ );
            if (user.validPassword(password))
                return done(null, user /*, req.flash('loginMessage', 'opp! nop password')*/ );

            return done(null, user);
        });

    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
module.exports = passport;
/*module.export = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, donde) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
            usernameField: 'name',
            passwordField: 'password',
            passReqToCallback: True
        },
        function(req, name, password, done) {
            if (name)
                name = name.toLowerCase();

            process.nextTick(function() {
                User.findOne({ 'local.name': name }, function(err, user) {
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found'));
                    if (!user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', 'opp! nop password'));
                    else
                        return done(null, user);
                });
            })
        }));

}*/