const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('../models/account');
const Account = connection.models.Account;
const validPassword = require('../lib/passwordUtils').validPassword;

const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
};

const verifyCallback = (username, password, done) => {

    Account.findOne({ username: username })
        .then((account) => {

            if (!account) { return done(null, false) }
            
            const isValid = validPassword(password, account.hash, account.salt);
            
            if (isValid) {
                return done(null, account);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((account, done) => {
    done(null, account.id);
});

passport.deserializeUser((accountId, done) => {
    Account.findById(accountId)
        .then((account) => {
            done(null, account);
        })
        .catch(err => done(err))
});

