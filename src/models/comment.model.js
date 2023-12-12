const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const comments = new Schema({
    postsid: { type: Schema.Types.ObjectId, required: true },
    userid: { type: Schema.Types.ObjectId, required: true },
    username: { type: String, required: true },
    useravtar: { type: String, required: true },
    content: { type: String, required: true },
    replies: Array
}, {
    timestamps: true,
});

module.exports = mongoose.model('comment', comments);