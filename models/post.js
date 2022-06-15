const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" }, //this is location where post is created
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, minlength: 1 },
  post: { type: String, minLength: 1, required: true },
  date: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [],
});

module.exports = mongoose.model("Post", PostSchema);
