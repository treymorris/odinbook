require("dotenv").config();
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.get_posts = function (req, res) {
    res.json({
        message: 'not implemented: get posts'
    });
};

exports.get_one_post = function (req, res) {
    res.json({
        message: 'not implemented: get one post;'
    });
};

exports.create_post = function (req, res) {
    res.json({
        message: 'not implemented: create post'
    });
};

exports.edit_post = function (req, res) {
    res.json({
        message: 'not  implemented: edit post'
    });
};

exports.like_post = function (req, res) {
    res.json({
        message: 'not implemented: like post'
    });
};

exports.delete_post = function (req, res) {
    res.json({
        message: 'not implemented: delete post'
    });
};