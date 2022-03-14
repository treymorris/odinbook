const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');
const verifyToken = require('../config/verifyToken');

// GET posts
router.get('/', post_controller.get_posts);

// GET one post
router.get('/:id', post_controller.get_one_post);

// POST create post
router.post('/create', post_controller.create_post);

// PUT edit post
router.put(':id/edit', post_controller.edit_post);

// PUT like post
router.put(':id/like', post_controller.like_post);

// DELETE post
router.delete('/:id/delete', post_controller.delete_post);

module.exports = router;