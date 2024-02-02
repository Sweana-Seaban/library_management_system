const express = require('express')
const route = express.Router();

const {homePage,displayBook,displayBooks,createBook} = require('../controllers/bookController')

route.get('/',homePage);

route.get('/books',displayBooks);

route.get('/book/:id',displayBook);

route.post('/book',createBook);

module.exports = route