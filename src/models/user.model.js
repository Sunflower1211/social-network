const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const users = new Schema({
    account: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true, unique: true },
    socketid: { type: String, default: '' },
    sex: { type: String, required: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    following: Array,
    followers: Array
}, {
    timestamps: true,
});

module.exports = mongoose.model('user', users);