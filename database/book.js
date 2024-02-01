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

const Book = sequelize.define('book',{
    book_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    book_title:DataTypes.STRING,
    book_genre:DataTypes.STRING,
    book_price:DataTypes.INTEGER
},{timestamps:false});

Book.sync({alter:true}).then(() => {
    console.log('Books table created successfully');
}).catch(() => {
    console.log('Error while creating table');
})