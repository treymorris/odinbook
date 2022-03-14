require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const async = require('async');
const Post = require('../models/post');
const Profile = require("../models/profile");

exports.get_users = function (req, res) {
    User.find({})
        .sort({ name: 1 })
        .populate('posts')
        ,populate('friends')
        .exec(function (err, results) {
            if (err) { return next(err) }
            res.status(200).json({
                data: results
            });
        });
};
    
exports.get_one_user = function (req, res) {
    res.json({
        message: 'not implemented'
    })
}

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

exports.user_logout = function (req, res) {
    req.logout();
    res.json({ message: 'Logout success!' });
};

exports.user_create_profile = [
    body('occupation', 'Please enter your occupation.').optional().trim().isLength({ max: 25 }).escape(),
    body('hobbies', 'Please enter a hobby.').optional().trim().isLength({ max: 250 }).escape(),
        
        (req, res, next) => {
            const errors = validationResult(req);
            
            if (!errors.isEmpty()) return res.json({ errors: errors.array() });


            const profile = new Profile({
                user: req.body.user,
                birth_date: req.body.birth_date,
                occupation: req.body.occupation,
                profile_pic: req.body.profile_pic,
                hobbies: req.body.hobbies 
            })
            .save(function (err) {
                if (err) { return next(err); }
            });
            res.json({
                message: 'Profile created!'
            });
        }
]

exports.user_profile_update = [
    body('occupation', 'Please enter your occupation.').trim().isLength({ max: 25 }).escape(),
    body('hobbies', 'Please enter a hobby.').trim().isLength({ max: 250 }).escape(),
        
        (req, res, next) => {
            const errors = validationResult(req);
            
            if (!errors.isEmpty()) return res.json({ errors: errors.array() });


            const profile = new Profile({
                user: req.body.user,
                birth_date: req.body.birth_date,
                occupation: req.body.occupation,
                profile_pic: req.body.profile_pic,
                hobbies: req.body.hobbies,
                _id: req.body._id
            });
            Profile.findByIdAndUpdate(req.body._id, profile, {}, function (err, theprofile) {
                    if (err) { return next(err); }
                    res.json({
                        message: 'Profile updated!',
                        user: theprofile
                    });
            });
        }
]

exports.delete_user = function (req, res, next) {
    User.findByIdAndRemove(req.params.id, function deleteUser(err) {
        if (err) { return next(err); }
        res.json({message: 'User Deleted!'})
    })
}