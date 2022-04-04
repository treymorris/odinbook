const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: { type: String, required: true, maxLength: 25 },
    lastname: { type: String, required: true, maxLength: 25 },
    password: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, minLength: 1 },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friend_requests: [{ type: Schema.Types.ObjectId, ref: 'Friend' }],
    birth_date: { type: Date },
    bio: { type: String, maxlength: 550 },
    profile_pic: { type: String },
    hobbies: { type: String, maxlength: 550}
});

// Virtual for User's full name
UserSchema
.virtual('name')
.get(function () {
// To avoid errors in cases where a User does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
  var fullname = '';
  if (this.first_name && this.last_name) {
    fullname = this.lastname + ', ' + this.firstname
  }
  if (!this.firstname || !this.lastname) {
    fullname = '';
  }
  return fullname;
});

// Virtual for user's URL
UserSchema
.virtual('url')
.get(function () {
  return '/users/' + this._id;
});


module.exports = mongoose.model('User', UserSchema);