var express = require("express");
var router = express.Router();
const friend_controller = require("../controllers/friendController");
const verifyToken = require("../config/verifyToken");

// POST friend request
router.post("/request", friend_controller.friend_request);

// POST friend accept
router.put("/accept", friend_controller.friend_accept);

//POST friend declined
router.put("/declined", friend_controller.friend_declined);

//GET friend requests pending
router.get("/pending", friend_controller.friend_pending);

//GET friend requests accepted
router.get("/accepted", friend_controller.friend_accepted);

module.exports = router;
