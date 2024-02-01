const {selectUsers,selectUserById,insertUser,updateUser} = require('../database/user')

//homepage
const homePage = (req,res) => {
    res.send('Welcome to Users page')
}

//select all
const displayUsers = async(req,res) => {
    const users = await selectUsers();
    res.send(users)
}

//select by id
const displayUserById = async(req,res) => {
    const user_id = req.params.id
    const user = await selectUserById(user_id)
    res.send(user)
}

//create user
const createUser = async(req,res) => {
    const {name,email,password,type} = req.body
    const createdUser = await insertUser(name,email,password,type)
    res.send(createdUser)
}

const changeUser = async(req,res) => {
    const id = req.params.id;
    const {name,email,password,type} = req.body
    const changedUser = await updateUser(id,name,email,password,type)
    res.send(changedUser)
}

module.exports = {homePage,displayUsers,displayUserById,createUser,changeUser}