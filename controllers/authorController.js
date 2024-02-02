const {selectAuthors,selectAuthor,insertAuthor} = require('../database/author');


const homePage = async(req,res) => {
    res.send('Welcome to Authors Page');
}

const displayAuthors = async(req,res) => {
    res.send(await selectAuthors());
}

const displayAuthor = async(req,res) => {
    const id = req.params.id
    res.send(await selectAuthor(id))
}

const createAuthor = async(req,res) => {
    const {name} = req.body
    const author = insertAuthor(name)
    res.send('Author created successfully')
}

module.exports = {homePage,displayAuthors,displayAuthor,createAuthor}