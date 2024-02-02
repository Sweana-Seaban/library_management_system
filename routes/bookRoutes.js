const express = require('express')
const route = express.Router();

const {homePage,displayBook,displayBooks} = require('../controllers/bookController')

route.get('/',homePage);

route.get('/books',displayBooks);

route.get('/book/:id',displayBook);

module.exports = route