const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    Authorname: {
        type: String,
        required: true
    },
    YearOfPublication: {
        type: String,
        required: true
    },
    NoOfCopies: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Book', BookSchema);