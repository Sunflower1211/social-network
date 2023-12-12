const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messagePrivates = new Schema({
    sendername: { type: String, required: true },
    receivername: { type: String, required: true },
    content: String
}, {
    timestamps: true,
});

module.exports = mongoose.model('messagePrivate', messagePrivates)