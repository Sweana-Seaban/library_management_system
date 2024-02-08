const Sequelize = require('sequelize');
const {DataTypes} = require('sequelize');


const sequelize = new Sequelize('library_management_system','root','password',{
	dialect:'mysql'
});

const Author = sequelize.define('author',{
	author_id:{
		type:DataTypes.INTEGER,
		primaryKey:true,
		autoIncrement:true
	},
	author_name:DataTypes.STRING
},{timestamps:false});

//select all authors
const selectAuthors = async() => {
	try{
		const authors = await Author.findAll();
		return authors;
	}
	catch(error){
		console.log(error);
	}
};

//select author by id
const selectAuthor = async(id) => {
	try{
		return(await Author.findByPk(id));
	}
	catch(error){
		console.log(error);
	}
};

//insert author
const insertAuthor = async(name) => {
	try{
		const author = Author.create({
			author_name:name
		});
		return(author);
	}
	catch(error){
		console.log(error);
	}
};

//update author
const updateAuthor = async(id,name) => {
	try{
		const author = Author.update({
			author_name:name
		},{where:{author_id:id}});
	}
	catch(error){
		console.log(error);
	}
};

//delete author
const deleteAuthor = async(id) => {
	try{
		const author = Author.findOne({where:{author_id:id}});
	}
	catch(error){
		console.log(error);
	}
};

module.exports ={selectAuthors, selectAuthor, insertAuthor, updateAuthor,deleteAuthor};
// module.exports = Author