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

exports.create_comment = function (req, res) {
    res.json({
        message: 'not implemented: create comment'
    });
};

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