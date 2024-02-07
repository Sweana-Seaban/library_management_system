const {selectUsers,selectUserById,insertUser,updateUser,deleteUser,findUser} = require('../database/user_db')
const bcrypt = require('bcryptjs')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())
require('dotenv').config()
const {generateAccessToken} = require('../middleware')
let refreshTokens = []

//homepage
// const homePage = (req,res) => {
//     res.send('Welcome to Users page')
// }

//select all
const displayUsers = async(req,res) => {
    const users = await selectUsers();
    //res.json(users)
    //console.log(req.user.isAdmin);
    res.json(users.filter(user => user.user_name === req.user.name))
}

//select by id
const displayUserById = async(req,res) => {
    const user_id = req.params.id
    const user = await selectUserById(user_id)
    if(user)
        res.send(user)
    else
        res.send('User does not exist')
}

//create user
const createUser = async(req,res) => {
    if(req.user.isAdmin){
        const {name,email,password,isAdmin} = req.body
        bcrypt.hash(password,10).then(async (hash) => {
        const createdUser = await insertUser(name,email,hash,isAdmin)
        res.send(createdUser)
        })
    }
    else{
        res.send('Unauthenticated')
    }
}

//update user
const changeUser = async(req,res) => {
    if(req.user.isAdmin){
        console.log('starting query');
        const id = req.params.id;
        const {name,email,password,isAdmin} = req.body
        bcrypt.hash(password,10).then(async (hash) => {
        const changedUser = await updateUser(id,name,email,hash,isAdmin)
        res.send('User updated successfully')
        })
    }
    else{
        res.send('Unauthenticated')
    }
}

//delete user
const removeUser = async(req,res) => {
    if(req.user.isAdmin){
        console.log('starting query');
        const id = req.params.id
        const user = await deleteUser(id)
        res.send('User deleted successfully')
    }
    else{
        res.send('Unauthenticated')
    }
    
}

const userLogin = async(req,res) => {
    const {email,password} = req.body
    const requesteduser = await findUser(email)
    if(requesteduser){
        //console.log(requesteduser.user_password);
        bcrypt.compare(password,requesteduser.user_password).then(function (result) {
            result
            ? console.log('Login Successful'):console.log('Login not successful');

            //        res.status(200).json({
            //       message: "Login successful",
            //       requesteduser,
            //     })
            //   : res.status(400).json({ message: "Login not succesful" }) //incorrect password
        const user = {name:requesteduser.user_name,password:requesteduser.user_password,isAdmin:requesteduser.user_isAdmin}
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        //refreshTokens.push(refreshToken)
        //const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        
        
        res.json({accessToken : accessToken, refreshToken : refreshToken})
        })   
    }
    else{
        res.send('Login not succesful') //incorrect email
    }
    
    
}

module.exports = {displayUsers,displayUserById,createUser,changeUser,removeUser,userLogin}