const {selectAuthor,insertAuthor,updateAuthor,deleteAuthor, selectAuthors} = require('../database/author_db');


const homePage = async(req,res) => {
    res.send('Welcome to Authors Page');
}

const displayAuthors = async (req,res) => {
    const authors = await selectAuthors()
    console.log(authors)
    res.send(authors);
    
}

const displayAuthor = async(req,res) => {
    const id = req.params.id
    const author = await selectAuthor(id)
    if(!author)
        res.send('Author does not exist')
    else
        res.send(author)
}

const createAuthor = async(req,res) => {
    const {name} = req.body
    const author = insertAuthor(name)
    res.send('Author created successfully')
}

const modifyAuthor = async(req,res) => {
    const id = req.params.id
    const {name} = req.body
    const author = updateAuthor(id,name)
    res.send('Author updated successfully')
}

const removeAuthor = async(req,res) => {
    const id =req.params.id
    const author = deleteAuthor(id)
    res.send('Author deleted successfully')
}

module.exports = {homePage,displayAuthors,displayAuthor,createAuthor,modifyAuthor,removeAuthor}