const {selectAuthors,selectAuthor} = require('../database/author');


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

module.exports = {homePage,displayAuthors,displayAuthor}