var express = require('express');
var router = express.Router();
const user_controller = require('../controllers/userController');

// GET users
router.get('/', user_controller.get_users);

// POST user sign up
router.post('/signup', user_controller.user_signup);

//POST user log in
router.post('/login', user_controller.user_login);

module.exports = router;
