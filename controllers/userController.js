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
    User.find({}, 'first_name last_name friend_requests')
        .sort({ name: 1 })
        .populate('friend_requests')
        .exec(function (err, user_list) {
            if (err) { return next(err) }
            res.status(200).json({
                user_list: user_list
            });
        });
    };

exports.user_signup = [
    body('first_name', 'Please enter a first name!').trim().isLength({ min: 1 }).escape(),
    body('last_name', 'Please enter a last name!').trim().isLength({ min: 1 }).escape(),
    body('username', 'Please enter a Username!').trim().isLength({ min: 1 }).escape(),
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
                password: hashedPass,
                username: req.body.username,
                profile_pic: req.body.profile_pic ? req.body.profile_pic : '',
                posts: [],
                friends: [],
                friend_requests: []
            })
                .save((err, user) => {
                    if (err) { return next(err) };
                    jwt.sign({ user }, process.env.SECRET, (err, token) => { res.status(200).json({ token, message: 'Sign Up Success!' }) });
                });
        });
    }
];

// exports.user_login = [
//     body('username', 'Enter Username!').trim().isLength({ min: 1 }).escape(),
//     body('password', 'Enter a password!').trim().isLength({ min: 5 }).escape(),

//     (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) return res.json({ errors: errors.array() });
//         console.log('stuck here?')
//         passport.authenticate('local', {session:false}),
//             function (req, res) {
//                 console.log('hello')
//                 jwt.sign({ user }, process.env.SECRET, { expiresIn: '10m' }, (err, token) => { res.json({ token }) });
//             }
//     }
// ]
// Come back to this to make it work with session
exports.user_login = [
    body('username', 'Enter Username!').trim().isLength({ min: 1 }).escape(),
    body('password', 'Enter a password!').trim().isLength({ min: 5 }).escape(),
    
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.json({ errors: errors.array() });
        passport.authenticate('local', { session: false }, (err, user) => {
            if (err || !user) {
                return res.status(401).json({ message: 'Incorrect Email or Password!', user });
            } jwt.sign({ user }, process.env.SECRET, { expiresIn: '10m' }, (err, token) => { res.json({ token }) });
        })(req,res);
    }
];
// Fix logout probably related to session
exports.user_logout = function (req, res) {
    req.logout();
    res.json({ message: 'Logout success!' });
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