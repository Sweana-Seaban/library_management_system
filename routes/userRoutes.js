const express = require('express')
const route = express.Router();

const {homePage,displayUsers,displayUserById,createUser} = require('../controllers/userController')

route.get('/',homePage);

route.get('/users',displayUsers);

route.get('/user/:id',displayUserById);

route.post('/user',createUser);

module.exports = route;