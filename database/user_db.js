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
    user_isAdmin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
}},{timestamps:false})

// User.sync({alter:true}).then(() => {
//     console.log('Users table created successfully');
// }).catch(() => {
//     console.log('Error while table creation');
// })

//select all
const selectUsers = async() => {
    try{
        return await User.findAll();
    }
    catch(error){
        console.log(error);
    }
}

//select by id
const selectUserById = async(id) => {
    try{
        return await User.findByPk(id)
    }
    catch(error){
        console.log(error);
    }
}

//insert user
const insertUser = async(name,email,password,isAdmin) => {
    try{
        const user = User.create({
            user_name:name,
            user_email:email,
            user_password:password,
            user_isAdmin:isAdmin
        })
        return user;
    }
    catch(error){
        console.log(error);
    }
}

//update user
const updateUser = async(id,name,email,password,isAdmin) => {
    try{
        const user = User.update({
            user_name:name,
            user_email:email,
            user_password:password,
            user_isAdmin:isAdmin
        },{where:{user_id:id}})
        return user;
    }
    catch(error){
        console.log(error);
    }
}

//delete user
const deleteUser = async(id) => {
    try{
        const user = User.destroy({
            where:{user_id:id}
        })
        console.log(user[0]);
        return user;
    }
    catch(error){
        console.log(error);
    }
}

// const loginUser = async(email,password) => {
//     const user = User.findOne({where:{
//         user_email:email,
//         user_password:password
//     }})
//     return user
// }


module.exports = {selectUsers,selectUserById,insertUser,updateUser,deleteUser}