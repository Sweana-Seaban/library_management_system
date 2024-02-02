const Sequelize = require('sequelize')
const {DataTypes,Op} = require('sequelize')
const Author = require('../database/author')

const sequelize = new Sequelize('library_management_system','root','password',{
    dialect:'mysql'
})

// sequelize.authenticate().then(() => {
//     console.log('Connected to database successfully');
// }).catch(() => {
//     console.log('Error while connecting to database');
// })

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

Book.belongsTo(Author,{foreignKey:'author_id'}); //foreign key from authors table

Book.sync({alter:true}).then(() => {
    console.log('Books table created successfully');
}).catch(() => {
    console.log('Error while creating table');
})

//select all books
const selectBooks = async() => {
    return Book.findAll();
}

//select by id
const selectBook = async(id) => {
    return Book.findByPk(id);
}

//insert book
const insertBook = async(authorid,title,genre,price) => {
    const book = Book.create({
        book_title:title,
        book_genre:genre,
        book_price:price,
        author_id:authorid
    })
    return(book)
}

//update book
const updateBook = async(id,title,genre,price) => {
    const book = Book.update({
        book_title:title,
        book_genre:genre,
        book_price:price
    },{where:{book_id:id}})
    return(book)
}

//delete book
const deleteBook = async(id) => {
    const book = Book.destroy({where:{book_id:id}})
    return(book)
}

module.exports = {selectBook,selectBooks,insertBook,updateBook,deleteBook}
