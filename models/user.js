const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})
module.exports = mongoose.model('User', UserSchema)