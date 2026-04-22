var express = require('express');
var router = express.Router();

/* GET register page */
router.get('/register', function(req, res) {
  res.render('register', { title: 'Register', message: '' });
});

/* POST register */
router.post('/register', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  res.send(`Register submitted for ${username}`);
});

/* GET login page */
router.get('/login', function(req, res) {
  res.render('login', { title: 'Login', message: '' });
});

/* POST login */
router.post('/login', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  res.send(`Login submitted for ${username}`);
});

/* LOGOUT */
router.get('/logout', function(req, res) {
  res.redirect('/');
});

module.exports = router;