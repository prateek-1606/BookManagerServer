const express = require('express')
const moongose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()

const BookRoute = require('./routes/book');
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000
const URL = process.env.MONGOURI

app.get('/', (req, res) => {
    res.send('Heloo Browsrere')
})
app.use('/book', BookRoute)
app.use(require('./routes/user'))

moongose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`Server Running on Port:${PORT}`)
    }))
    .catch((error) => {
        console.log(error);
    })
