const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, minlength: 1 },
  post: { type: String, minLength: 1, required: true },
  date: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: [],
});

PostSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
});

// Virtual for post's URL
PostSchema.virtual("url").get(function () {
  return "/posts/" + this._id;
});

module.exports = mongoose.model("Post", PostSchema);
