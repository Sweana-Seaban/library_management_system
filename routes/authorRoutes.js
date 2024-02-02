const express = require('express')
const route = express.Router();

const {homePage,displayAuthors,displayAuthor,createAuthor,modifyAuthor} = require('../controllers/authorController')

route.get('/',homePage);

route.get('/authors',displayAuthors);

route.get('/author/:id',displayAuthor);

route.post('/author',createAuthor);

route.put('/author/:id',modifyAuthor);

module.exports = route