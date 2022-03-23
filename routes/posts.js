const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');
const verifyToken = require('../config/verifyToken');

// POST create post
router.post('/create', post_controller.create_post);

// DELETE post
router.delete('/:id/delete', verifyToken, post_controller.delete_post);

// PUT edit post
router.post('/:id/edit', verifyToken, post_controller.edit_post);

// GET one post
router.get('/:id', post_controller.get_one_post);

// GET posts
router.get('/', post_controller.get_posts);

// POST like post
router.post(':id/like', post_controller.like_post);

module.exports = router;