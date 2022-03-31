require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const async = require('async');
const Post = require('../models/post');
const Friend = require("../models/friend");

exports.friend_request = [

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.json({ errors: errors.array() });

        const request = new Friend({
            from: req.body.from,
            to: req.body.to,
            status: 'Pending'
        })
            .save(function (err) {
                if (err) { return next(err); }
                res.json({
                    message: "Request Made"
                })
            })
    }
    
]
    
exports.friend_accept = function (req, res) {
    Friend.findByIdAndUpdate(req.body.id, { status: 'Accepted' }, function (err, update) {
        if (err) { return next(err) };
        res.json({
            message: 'Accepted!'
        });
    });
        
};

exports.friend_declined = function (req, res) {
    Friend.findByIdAndUpdate(req.body.id, { status: 'Declined' }, function (err, update) {
        if (err) { return next(err) };
        res.json({
            message: 'Declined!'
        });
    });
};

exports.friend_pending = function (req, res) {

    Friend.find({'status': 'Pending'})
        .populate('from to')
        .exec(function (err, data) {
            if (err) { return next(err) };
            res.status(200).json({
                data
            })
    })
};