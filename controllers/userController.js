const {selectUsers,selectUserById,insertUser,updateUser,deleteUser,loginUser} = require('../database/user_db')
const bcrypt = require('bcryptjs')

//homepage
// const homePage = (req,res) => {
//     res.send('Welcome to Users page')
// }

//select all
const displayUsers = async(req,res) => {
    const users = await selectUsers();
    res.send(users)
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
    const {name,email,password,isAdmin} = req.body
    bcrypt.hash(password,10).then(async (hash) => {
        const createdUser = await insertUser(name,email,hash,isAdmin)
        res.send(createdUser)
    })
}

//update user
const changeUser = async(req,res) => {
    const id = req.params.id;
    const {name,email,password,isAdmin} = req.body
    bcrypt.hash(password,10).then(async (hash) => {
        const changedUser = await updateUser(id,name,email,hash,isAdmin)
        res.send('User updated successfully')
    })
}

//delete user
const removeUser = async(req,res) => {
    const id = req.params.id
    const user = await deleteUser(id)
    res.send('User deleted successfully')
}

// const userLogin = async(req,res) => {
//     const {email,password} = req.body
//     const user = await loginUser(email,password)
//     console.log(user[0]);
//     res.send('Welcome')
// }

module.exports = {displayUsers,displayUserById,createUser,changeUser,removeUser}