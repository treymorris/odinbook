var express = require('express');
var router = express.Router();
const user_controller = require('../controllers/userController');
const verifyToken = require('../config/verifyToken');

// GET users
router.get('/', user_controller.get_users);

// Get one user
router.get('/:id', user_controller.get_one_user);

// POST user sign up
router.post('/signup', verifyToken, user_controller.user_signup);

// POST user log in
router.post('/login', verifyToken, user_controller.user_login);

// GET user log out
router.post('/logout', user_controller.user_logout);

// POST user add profile
router.post('/create', verifyToken, user_controller.user_create_profile);

//PUT user update profile
router.put('/update', verifyToken, user_controller.user_profile_update);

//DELETE user 
router.delete('/delete/:id', verifyToken, user_controller.delete_user)

module.exports = router;
