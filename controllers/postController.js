require("dotenv").config();
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const post = require("../models/post");

exports.get_posts = function (req, res) {
    Post.find({ author: req.params.id })
        .sort({ date: desc })
        .exec(function (err, posts) {
            if (err) return handleError(err);
            res.json({
                posts: posts
            });
    })
    
};

exports.get_one_post = function (req, res) {
    res.json({
        message: 'not implemented: get one post;'
    });
};

exports.create_post = [
    body('content', 'Please enter content!').trim().isLength({ min: 1, max: 300 }).escape(),
    
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.json({ errors: errors.array() });

        const post = new Post({
            user: req.body.user,
            content: req.body.content,
            comments: [],
            likes: []
        })
            .save(function (err) {
                if (err) { return next(err); }
                res.json({
                    message: 'Post Created!',
                })
        })
    },
]

exports.edit_post = [
    body('content', 'Please enter some content!').trim().isLength({ min: 1, max: 300 }).escape(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.json({ errors: errors.array() });

        const post = new Post({
            _id: req.params._id,
            content: req.body.content
        })
            .findByIdAndUpdate(req.params.id, post, {}, function (err, thepost) {
                if (err) { return next(err); }
                res.json({
                    message: 'Post Updated!'
                })
        })
    }
]

exports.like_post = function (req, res, next) {
    Post.findByIdAndUpdate(req.params.id, post, {}, function (err, thepost) {
        if (err) { return next(err); }
        post.likes.push('like')
        post.save()
        res.json({
            message: 'Post liked!',
            post: thepost
        });
    })
};

exports.delete_post = function (req, res) {
    res.json({
        message: 'not implemented: delete post'
    });
};