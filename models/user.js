const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 25 },
    last_name: { type: String, required: true, maxLength: 25 },
    password: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, minLength: 5 },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    friends: [],
    friend_requests: [],
    facebook_id: { type: String, required: false }
});

// Virtual for User's full name
UserSchema
.virtual('name')
.get(function () {
// To avoid errors in cases where a User does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
  var fullname = '';
  if (this.first_name && this.last_name) {
    fullname = this.last_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.last_name) {
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