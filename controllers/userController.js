require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Comment = require("../models/comment")
const { body, validationResult } = require("express-validator");
const async = require("async");
const Post = require("../models/post");
const Friend = require("../models/friend");

exports.get_users = function (req, res) {
  User.find({})
    .sort([["username", "ascending"]])
    .exec(function (err, list_users) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        user_list: list_users,
      });
    });
};

exports.get_one_user = function (req, res, next) {
  async.parallel(
    {
      user: function (callback) {
        User.findById(req.params.id).exec(callback);
      },
      users_posts: function (callback) {
        Post.find({ user: req.params.id }, "user title post date likes")
          .populate("user")
          .exec(callback);
      },
      post_comments: function (callback) {
        Comment.find({ user: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.user == null) {
        var err = new Error("User not found");
        err.status = 404;
        return next(err);
      }
      res.json({
        message: "get one user",
        user: results.user,
        users_posts: results.users_posts,
        comments: results.post_comments
      });
    }
  );
};

exports.user_signup = [
  body("firstname", "Please enter a first name!")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastname", "Please enter a last name!")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "Please enter a Username!")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("email", "Email required!").trim().isEmail().escape(),
  body("password", "Please enter a password!")
    .trim()
    .isLength({ min: 5 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json({ errors: errors.array() });
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
      if (err) return next(err);
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPass,
        username: req.body.username,
      }).save((err, user) => {
        if (err) {
          return next(err);
        }
        return res.json({
          message: "success!",
        });
      });
    });
  },
];

exports.user_login = [
  body("username", "Enter Username!").trim().isLength({ min: 1 }).escape(),
  body("password", "Enter a password!").trim().isLength({ min: 5 }).escape(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array() });
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err || !user) {
        return res
          .status(401)
          .json({ message: "Incorrect Email or Password!", user });
      }
      jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: "10m" },
        (err, token) => {
          res.json({ token, userid: user._id });
        }
      );
    })(req, res);
  },
];

exports.user_logout = function (req, res) {
  req.logout();
  res.json({ message: "Logout success!" });
};

exports.user_create_profile = [
  body("occupation", "Please enter your occupation.")
    .optional()
    .trim()
    .isLength({ max: 25 })
    .escape(),
  body("hobbies", "Please enter a hobby.")
    .optional()
    .trim()
    .isLength({ max: 250 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.json({ errors: errors.array() });

    const profile = new Profile({
      user: req.body.user,
      birth_date: req.body.birth_date,
      occupation: req.body.occupation,
      profile_pic: req.body.profile_pic,
      hobbies: req.body.hobbies,
    }).save(function (err) {
      if (err) {
        return next(err);
      }
    });
    res.json({
      message: "Profile created!",
    });
  },
];

exports.user_profile_update = [
  body("occupation", "Please enter your occupation.")
    .trim()
    .isLength({ max: 25 })
    .escape(),
  body("hobbies", "Please enter a hobby.")
    .trim()
    .isLength({ max: 250 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.json({ errors: errors.array() });

    const profile = new Profile({
      user: req.body.user,
      birth_date: req.body.birth_date,
      occupation: req.body.occupation,
      profile_pic: req.body.profile_pic,
      hobbies: req.body.hobbies,
      _id: req.body._id,
    });
    Profile.findByIdAndUpdate(
      req.body._id,
      profile,
      {},
      function (err, theprofile) {
        if (err) {
          return next(err);
        }
        res.json({
          message: "Profile updated!",
          user: theprofile,
        });
      }
    );
  },
];

exports.delete_user = function (req, res, next) {
  User.findByIdAndRemove(req.body.userid, function deleteUser(err) {
    if (err) {
      return next(err);
    }
    res.json({ message: "User Deleted!" });
  });
};
