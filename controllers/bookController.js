const {selectBook,selectBooks,insertBook,updateBook,deleteBook} = require('../database/book_db')

module.exports.displayBooks = async(req,res) => {
    res.send(await selectBooks())
}

module.exports.displayBook = async(req,res) => {
    const id = req.params.id
    const book = await selectBook(id)
    if(book)
        res.send(book)
    else    
        res.send('Book does not exist')
}

module.exports.createBook = async(req,res) => {
    const {title,genre,price,id} = req.body
    const book = await insertBook(id,title,genre,price)
    res.send('Book inserted successfully')
}

module.exports.modifyBook = async(req,res) => {
    const id = req.params.id
    const {title,genre,price} = req.body
    const book = await updateBook(id,title,genre,price)
    res.send('Book updated succcessfully')
}

module.exports.removeBook = async(req,res) => {
    const id =req.params.id
    const book = await deleteBook(id)
    
    res.send('Book deleted successfully')
}

//module.exports = {homePage,displayBook,displayBooks,createBook,modifyBook,removeBook}