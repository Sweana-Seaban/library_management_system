const {selectUsers,selectUserById} = require('../database/user')


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

module.exports = {homePage,displayUsers,displayUserById}