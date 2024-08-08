const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)