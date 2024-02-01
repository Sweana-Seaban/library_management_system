const Sequelize = require('sequelize')
const {DataTypes,Op} = require('sequelize')

const sequelize =new Sequelize('library_management_system','root','password',{
    dialect:'mysql'
})

// sequelize.authenticate().then(() => {
//     console.log('Connected to database successfully');
// }).catch(() => {
//     console.log('Error while connecting to database');
// })

const User = sequelize.define('user',{
    user_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user_name:DataTypes.STRING,
    user_email:DataTypes.STRING,
    user_password:DataTypes.STRING,
    user_type:DataTypes.STRING
},{timestamps:false})

// User.sync({alter:true}).then(() => {
//     console.log('Users table created successfully');
// }).catch(() => {
//     console.log('Error while table creation');
// })

//select all
const selectUsers = async() => {
    return await User.findAll();
}

//select by id
const selectUserById = async(id) => {
    return await User.findByPk(id)
}

//insert user
const insertUser = async(name,email,password,type) => {
    const user = User.create({
        user_name:name,
        user_email:email,
        user_password:password,
        user_type:type
    })
    return user;
}

//update user
const updateUser = async(id,name,email,password,type) => {
    const user = User.update({
        user_name:name,
        user_email:email,
        user_password:password,
        user_type:type
    },{where:{user_id:id}})
    return user;
}

//delete user
const deleteUser = async(id) => {
    const user = User.destroy({
        where:{user_id:id}
    })
    return user;
}

module.exports = {selectUsers,selectUserById,insertUser,updateUser,deleteUser}