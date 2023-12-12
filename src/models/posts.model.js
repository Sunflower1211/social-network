const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const posts = new Schema({
    userid: { type: Schema.Types.ObjectId, required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: Array, required: true },
    emotions: Array
}, {
    timestamps: true,
});

module.exports = mongoose.model('post', posts);