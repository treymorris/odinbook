const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    birth_date: { type: Date },
    occupation: { type: String, maxlength: 25 },
    profile_pic: { type: String },
    hobbies: [{ type: String, maxlength: 250 }]
});


module.exports = mongoose.model('Profile', ProfileSchema);