const Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');
//const Author = require('./author_db');

const sequelize = new Sequelize('library_management_system','root','password',{
	dialect:'mysql'
});

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

//Book.belongsTo(Author,{foreignKey:'author_id'}); //foreign key from authors table

//select all books
const selectBooks = async() => {
	try{
		return Book.findAll();
	}
	catch(error){
		console.log(error);
	}
};

//select by id
const selectBook = async(id) => {
	try{
		return Book.findByPk(id);
	}
	catch(error){
		console.log(error);
	}
};

//insert book
const insertBook = async(authorid,title,genre,price) => {
	try{
		const book = Book.create({
			book_title:title,
			book_genre:genre,
			book_price:price,
			author_id:authorid
		});
		return(book);
	}
	catch(error){
		console.log(error);
	}
};

//update book
const updateBook = async(id,title,genre,price) => {
	try{
		const book = Book.update({
			book_title:title,
			book_genre:genre,
			book_price:price
		},{where:{book_id:id}});
		return(book);
	}
	catch(error){
		console.log(error);
	}
};

//delete book
const deleteBook = async(id) => {
	try{
		const book = Book.destroy({where:{book_id:id}});
		return(book);
	}
	catch(error){
		console.log(error);
	}
};

module.exports = {selectBook,selectBooks,insertBook,updateBook,deleteBook};
