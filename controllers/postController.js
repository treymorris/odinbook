require("dotenv").config();
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Comment = require('../models/comment')
const async = require('async');

exports.get_posts = function (req, res) {
    Post.find({})
        .sort([['date', 'descending']])
        .populate('user')
        .exec(function (err, list_posts) {
            if (err) {return next(err)};
            res.status(200).json({
                post_list: list_posts
            });
    })
    
};

exports.get_one_post = function (req, res, next) {

    async.parallel({
        post: function (callback) {
            Post.findById(req.params.id)
                .populate('user')
                .exec(callback);
        },
        post_comments: function (callback) {
            Comment.find({ 'comment': req.params.id })
                .exec(callback);
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.post == null) {
            var err = new Error('Post not found');
            err.status = 404;
            return next(err);
        }
        res.json({
            message: 'get one post',
            title: results.title,
            post: results.post,
            comments: results.comments
        });
    });
    
};

exports.create_post = [
    body('title', 'Please enter a title!').trim().isLength({ min: 1 }).escape(),
    body('post', 'Please enter content!').trim().isLength({ min: 1, max: 300 }).escape(),
    
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.json({ errors: errors.array() });

        const post = new Post({
            user: req.body._id,
            title: req.body.title,
            post: req.body.post
        })
            .save(function (err) {
                if (err) { return next(err); }
                res.json({
                    message: 'Post Created!'
                })
        })
    }
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
    Post.findByIdAndUpdate(req.body.id, {}, function (err, thepost) {
        if (err) { return next(err); }
        thepost.likes.push('like')
        thepost.save()
        res.json({
            message: 'Post liked!',
            
        });
    })
};

exports.delete_post = function (req, res) {
    res.json({
        message: 'not implemented: delete post'
    });
};