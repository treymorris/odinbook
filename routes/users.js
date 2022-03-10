var express = require('express');
var router = express.Router();
const user_controller = require('../controllers/userController');

// GET users
router.get('/', user_controller.get_users);

// POST user sign up
router.post('/signup', user_controller.user_signup);

// POST user log in
router.post('/login', user_controller.user_login);

// POST user add profile
router.post('/create', user_controller.user_create_profile);

// POST user add profile picture
router.post('/addpic', user_controller.user_addpic);

module.exports = router;
