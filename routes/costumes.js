var express = require('express');
var router = express.Router();
var costume_controller = require('../controllers/costume');

// Middleware to check if user is logged in
const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.redirect("/login");
};

/* GET home page for costumes */
router.get('/', costume_controller.costume_view_all_Page);

/* GET detail costume page */
router.get('/detail', costume_controller.costume_view_one_Page);

/* GET create costume page */
router.get('/create', secured, costume_controller.costume_create_Page);

/* GET update costume page */
router.get('/update', secured, costume_controller.costume_update_Page);

/* GET delete costume page */
router.get('/delete', secured, costume_controller.costume_delete_Page);

module.exports = router;