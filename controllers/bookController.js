const {selectBook,selectBooks,insertBook,updateBook} = require('../database/book')

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

const createBook = async(req,res) => {
    const {title,genre,price} = req.body
    const book = await insertBook(title,genre,price)
    res.send('Book inserted successfully')
}

const modifyBook = async(req,res) => {
    const id = req.params.id
    const {title,genre,price} = req.body
    const book = await updateBook(id,title,genre,price)
    res.send('Book updated succcessfully')
}
module.exports = {homePage,displayBook,displayBooks,createBook,modifyBook}