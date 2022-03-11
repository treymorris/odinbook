require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const async = require('async');
const Post = require('../models/post')
const LocalStrategy = require('passport-local').Strategy


exports.get_users = function (req, res) {
    res.json({
        message: 'not implemented: get users'
    });
};

exports.user_signup = [
    body('first_name', 'Please enter a first name!').trim().isLength({ min: 1 }).escape(),
    body('last_name', 'Please enter a last name!').trim().isLength({ min: 1 }).escape(),
    body('email', 'Email required!').trim().isEmail().escape(),
    body('password', 'Please enter a password!').trim().isLength({ min: 5 }).escape(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.json({ errors: errors.array() });
        bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
            if (err) return next(err);
            const user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                profile_pic: req.body.profile_pic ? req.body.profile_pic : '',
                posts: [],
                friends: [],
                friend_requests: []
            })
                .save((err, user) => {
                    if (err) { return next(err) };
                    jwt.sign({ user }, process.env.SECRET, (err, token) => {
                        res.status(200).json({
                            token,
                            message: 'Sign Up Success!'
                        });
                    });
                });
            });
        }
]

exports.user_login = function (req, res) {
    res.json({
        message: 'not implemented: user login'
    });
};

exports.user_create_profile = function (req, res) {
    res.json({
        message: 'not implemented: create profile'
    });
};

exports.user_addpic = function (req, res) {
    res.json({
        message: 'not implemented: user add picture'
    });
};