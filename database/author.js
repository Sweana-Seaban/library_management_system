const Sequelize = require('sequelize')
const {DataTypes,Op} = require('sequelize')

const sequelize = new Sequelize('library_management_system','root','password',{
    dialect:'mysql'
})

sequelize.authenticate().then(() => {
    console.log('Connected to database successfully');
}).catch(() => {
    console.log('Error while connecting to database');
})

const Author = sequelize.define('author',{
    author_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    author_name:DataTypes.STRING
},{timestamps:false})

Author.sync({alter:true}).then(() => {
    console.log('Authors table created successfully');
}).catch(() => {
    console.log('Error while creating table');
})