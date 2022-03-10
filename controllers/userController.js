require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.get_users = function (req, res) {
    return res.json({
        message: 'not implemented: get users'
    });
};

exports.user_signup = function (req, res) {
    return res.json({
        message: 'not implemented: user sign up'
    });
};

exports.user_login = function (req, res) {
    return res.json({
        message: 'not implemented: user login'
    });
};

exports.user_create_profile = function (req, res) {
    return res.json({
        message: 'not implemented: create profile'
    });
};

exports.user_addpic = function (req, res) {
    return res.json({
        message: 'not implemented: user add picture'
    });
};