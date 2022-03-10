const { DateTime } = require('luxon');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String, required: true, maxLength: 300 },
    date: { type: Date, default: Date.now },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

CommentSchema
    .virtual('date_formatted')
    .get(function () {
        return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
    });