require("dotenv").config();
const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { json } = require("express/lib/response");

exports.get_comments = function (req, res) {
    res.json({
        message: 'not implemented: get comments'
    });
};

exports.get_one_comment = function (req, res) {
    res.json({
        message: 'not implemented: get one comment'
    });
};

exports.create_comment = [
    body('comment', 'Please enter a comment.').trim().isLength({ min: 1 }).escape(),
        
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.json({ errors: errors.array() });

        const comment = new Comment({
            user: req.body.user,
            post: req.body.post,
            comment: req.body.comment
        })
            .save(function (err) {
                if (err) { return next(err); }
                res.json({
                    message: 'Comment Created!'
                })
        })
    }
]

exports.edit_comment = function (req, res) {
    res.json({
        message: 'not implemented: edit comment'
    });
};

exports.like_comment = function (req, res) {
    res.json({
        message: 'not implemented: like comment'
    });
};

exports.delete_comment = function (req, res) {
    res.json({
        message: 'not implemented: delete comment'
    });
};