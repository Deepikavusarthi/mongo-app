var express = require('express');
var router = express.Router();
const costume_controllers = require('../controllers/costume');

router.get('/', costume_controllers.costume_view_all_Page);

module.exports = router;