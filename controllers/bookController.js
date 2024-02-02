const {selectBook,selectBooks} = require('../database/book')

const homePage = (req,res) => {
    res.send('Welcome to Books Page')
}

const displayBooks = async(req,res) => {
    res.send(await selectBooks())
}

const displayBook = async(req,res) => {
    const id = req.params.id
    res.send(await selectBook(id))
}

module.exports = {homePage,displayBook,displayBooks}