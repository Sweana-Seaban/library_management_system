const express = require('express')
const route = express.Router();

const {homePage,displayAuthors,displayAuthor,createAuthor} = require('../controllers/authorController')

route.get('/',homePage);

route.get('/authors',displayAuthors);

route.get('/author/:id',displayAuthor);

route.post('/author',createAuthor);

module.exports = route