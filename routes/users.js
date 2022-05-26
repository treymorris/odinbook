var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/userController");
const verifyToken = require("../config/verifyToken");

// POST user sign up
router.post("/signup", user_controller.user_signup);

//DELETE user
router.delete("/delete", user_controller.delete_user);

// Get one user
router.get("/:id", user_controller.get_one_user);

// POST user log in
router.post("/login", user_controller.user_login);

// GET user log out
router.post("/logout", user_controller.user_logout);

// POST user add profile
router.post("/create", verifyToken, user_controller.user_create_profile);

//POST user update profile
router.post("/update/:id", verifyToken, user_controller.user_profile_update);

// GET users
router.get("/", user_controller.get_users);

// GET users posts
//router.get('/posts', user_controller.users_posts);

module.exports = router;
