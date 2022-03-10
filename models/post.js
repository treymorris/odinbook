const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    comments: { type: Schema.Types.ObjectId, ref: 'Comment' },
    img_url: { type: String, required: false },
    likes: { type: Schema.Types.ObjectId, ref: 'User' }
});

PostSchema
    .virtual('date_formatted')
    .get(function () {
        return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
    });

module.exports = mongoose.model('Post', PostSchema);