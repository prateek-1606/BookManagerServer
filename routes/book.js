const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Auth = require('../middleware/auth')

router.get('/', Auth, (req, res) => {
    Book.find().then((book) => {
        res.json(book)
    })
        .catch(err => console.log(err))
})

router.post('/', Auth, (req, res) => {
    if (req.user.isAdmin === true) {
        const { Authorname, YearOfPublication, NoOfCopies } = req.body;
        if (!Authorname || !YearOfPublication || !NoOfCopies) {
            return res.status(422).json({ error: "please add all the fields" })
        }
        const book = new Book({
            Authorname,
            YearOfPublication,
            NoOfCopies
        })
        book.save()
            .then(() => {
                res.json('saved successfully')
            })
            .catch((err) => {
                console.log(err);
            })
    }
    else {
        res.send('You are Allowed for this!')
    }
})

router.put('/increment/:id', Auth, (req, res) => {
    if (req.user.isAdmin === true) {
        const id = req.params.id;
        Book.findById({ _id: id })
            .then((book) => {
                const { AuthorName, YearOfPublication } = book;
                let { NoOfCopies } = book
                NoOfCopies++
                Book.findOneAndUpdate({ AuthorName, YearOfPublication }, {
                    "$set": { "NoOfCopies": NoOfCopies }
                }).then(() => {
                    res.json('Book Count Incremented')
                }).catch((err) => {
                    console.log(err);
                    res.status(500).json(err);
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    else {
        res.send('You are Allowed for this!')
    }
})

router.put('/decrement/:id', (req, res) => {
    const id = req.params.id;
    Book.findById({ _id: id })
        .then((book) => {
            const { AuthorName, YearOfPublication } = book;
            let { NoOfCopies } = book
            NoOfCopies--;
            Book.findOneAndUpdate({ AuthorName, YearOfPublication }, {
                "$set": { "NoOfCopies": NoOfCopies }
            }).then(() => {
                res.json('Book Count Decremented')
            }).catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router