const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/commentController');
const verifyToken = require('../config/verifyToken');

// GET all comments
router.get('/', comment_controller.get_comments);

// GET one comment
router.get('/:id', comment_controller.get_one_comment);

// POST create comment
router.post('/create', verifyToken, comment_controller.create_comment);

// PUT update comment
router.put('/:id/edit', verifyToken, comment_controller.edit_comment);

// PUT like comment
router.put('/:id/like', verifyToken, comment_controller.like_comment);

// DELETE comment
router.delete('/:id/delete', verifyToken, comment_controller.delete_comment);

module.exports = router;