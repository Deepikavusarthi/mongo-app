var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/auth');

router.get('/', auth_controller.index);

router.get('/register', auth_controller.register_get);
router.post('/register', auth_controller.register_post);

router.get('/login', auth_controller.login_get);
router.post('/login', auth_controller.login_post);

router.get('/logout', auth_controller.logout);

router.get('/ping', auth_controller.ping);

module.exports = router;