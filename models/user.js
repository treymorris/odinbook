const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true, maxLength: 25 },
  lastname: { type: String, required: true, maxLength: 25 },
  password: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, minLength: 1 },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friend_requests: [{ type: Schema.Types.ObjectId, ref: "Friend" }],
  birth_date: { type: Date },
  bio: { type: String, maxlength: 550 },
  profile_pic: {
    type: String,
    default:
      "https://st2.depositphotos.com/9998432/48284/v/1600/depositphotos_482842120-stock-illustration-default-avatar-photo-placeholder-grey.jpg",
  },
  hobbies: { type: String, maxlength: 550 },
});

module.exports = mongoose.model("User", UserSchema);
