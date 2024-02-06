const express = require('express')
const route = express.Router();
const {body,validationResult} = require('express-validator')

const {displayUsers,displayUserById,createUser,changeUser,removeUser,userLogin} = require('../controllers/userController')

route.get('/view/users',displayUsers);

route.get('/view/users/:id',displayUserById);

route.post('/store/users',[
    body('email').notEmpty().isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().isLength({min:5}).withMessage('Enter minimum 5 characters for password'),
    body('name').notEmpty().withMessage('Enter a valid name'),
    body('isAdmin').notEmpty().withMessage('Enter a valid value')
],async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    }
    next();
    },createUser
);

route.put('/store/users/:id',[
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({min:5}).withMessage('Enter minimum 5 characters for password')
],async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    }
    changeUser(req,res)
});

// route.post('/login/user',userLogin);

route.delete('/delete/users/:id',removeUser);

module.exports = route;