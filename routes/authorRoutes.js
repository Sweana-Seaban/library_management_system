const express = require('express')
const route = express.Router();

const {homePage,displayAuthors,displayAuthor} = require('../controllers/authorController')

route.get('/',homePage);

route.get('/authors',displayAuthors);

route.get('/author/:id',displayAuthor);

module.exports = route