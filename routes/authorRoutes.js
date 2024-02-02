const express = require('express')
const route = express.Router();

const {homePage,displayAuthors,displayAuthor,createAuthor,modifyAuthor,removeAuthor} = require('../controllers/authorController')

route.get('/',homePage);

route.get('/authors',displayAuthors);

route.get('/author/:id',displayAuthor);

route.post('/author',createAuthor);

route.put('/author/:id',modifyAuthor);

route.delete('/author/:id',removeAuthor);

module.exports = route