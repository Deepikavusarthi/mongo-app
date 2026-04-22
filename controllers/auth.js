var passport = require('passport');
var Account = require('../models/account');

exports.index = function(req, res) {
  res.render('index', {
    title: 'Costume App',
    user: req.user
  });
};

exports.register_get = function(req, res) {
  res.render('register', {
    title: 'Costume App Registration'
  });
};

exports.register_post = function(req, res) {
  Account.findOne({ username: req.body.username })
    .then(function(user) {
      if (user != null) {
        console.log("exists " + req.body.username);
        return res.render('register', {
          title: 'Registration',
          message: 'Existing User',
          account: req.body.username
        });
      }

      let newAccount = new Account({
        username: req.body.username
      });

      Account.register(newAccount, req.body.password, function(err, user) {
        if (err) {
          console.log("db creation issue " + err);
          return res.render('register', {
            title: 'Registration',
            message: 'access error',
            account: req.body.username
          });
        }

        if (!user) {
          return res.render('register', {
            title: 'Registration',
            message: 'access error',
            account: req.body.username
          });
        }

        console.log("Success, redirect");
        res.redirect('/');
      });
    })
    .catch(function(err) {
      return res.render('register', {
        title: 'Registration',
        message: 'Registration error',
        account: req.body.username
      });
    });
};

exports.login_get = function(req, res) {
  res.render('login', {
    title: 'Costume App Login',
    user: req.user
  });
};

exports.login_post = [
  passport.authenticate('local'),
  function(req, res) {
    if (req.session.toReturn) {
      console.log("Send it back to " + req.session.toReturn);
      return res.redirect(req.session.toReturn);
    }
    res.redirect('/');
  }
];

exports.logout = function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

exports.ping = function(req, res) {
  res.status(200).send("pong!");
};