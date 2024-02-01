const express = require('express')
const route = express.Router();

const {homePage,displayUsers,displayUserById} = require('../controllers/userController')

route.get('/',homePage);

route.get('/users',displayUsers);

route.get('/user/:id',displayUserById);

module.exports = route;