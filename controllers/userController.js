const {selectUsers,selectUserById,insertuser} = require('../database/user')

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
    const createdUser = await insertuser(name,email,password,type)
    res.send(createdUser)
}
module.exports = {homePage,displayUsers,displayUserById,createUser}