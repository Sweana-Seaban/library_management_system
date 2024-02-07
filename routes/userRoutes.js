const express = require('express')
const route = express.Router();
const {body,validationResult} = require('express-validator')

const {authenticateToken, generateAccessToken} = require('../middleware')

const {displayUsers,displayUserById,createUser,changeUser,removeUser,userLogin} = require('../controllers/userController')

let refreshTokens = []

const jwt = require('jsonwebtoken')

route.get('/view/users',authenticateToken,displayUsers);

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
    },authenticateToken,createUser
);

route.put('/store/users/:id',[
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({min:5}).withMessage('Enter minimum 5 characters for password')
],async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    }
    next();
},authenticateToken,changeUser);

route.post('/user/login',userLogin);

route.delete('/delete/users/:id',authenticateToken,removeUser);

route.post('/token',(req,res) => {
    const refreshToken = req.body.token
    refreshTokens.push(refreshToken)
    if(refreshToken == null) return res.send('Refresh Token is null')
        if(!refreshTokens.includes(refreshToken)) return res.send('Refresh Token not included in lists')
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user) => {
            if (err) return res.sendStatus(403)
            console.log(user);
            const accessToken = generateAccessToken({name: user.name})
            res.json({accessToken : accessToken})
        //next()
        })
});

module.exports = route;