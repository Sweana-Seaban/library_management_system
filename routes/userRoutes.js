const express = require('express')
const route = express.Router();

const {homePage,displayUsers,displayUserById,createUser,changeUser} = require('../controllers/userController')

route.get('/',homePage);

route.get('/users',displayUsers);

route.get('/user/:id',displayUserById);

route.post('/user',createUser);

route.put('/user/:id',changeUser);

module.exports = route;