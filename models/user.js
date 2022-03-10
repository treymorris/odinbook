const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 25 },
    last_name: { type: String, required: true, maxLength: 25 },
    email: { type: String, required: true },
    password: { type: String, minLength: 5 },
    profile_pic: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friend_requests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    facebook_id: { type: String, required: false }
});

module.exports = mongoose.model('User', UserSchema);