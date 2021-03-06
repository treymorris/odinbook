const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" }, // this is location post is created
  author: { type: Schema.Types.ObjectId, ref: "User" },
  comment: { type: String, required: true, maxLength: 300 },
  date: { type: Date, default: Date.now },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  likes: [],
});

module.exports = mongoose.model("Comment", CommentSchema);
