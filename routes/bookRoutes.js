const express = require('express')
const route = express.Router();

const {homePage,displayBook,displayBooks,createBook,modifyBook} = require('../controllers/bookController')

route.get('/',homePage);

route.get('/books',displayBooks);

route.get('/book/:id',displayBook);

route.post('/book',createBook);

route.put('/book/:id',modifyBook);

module.exports = route