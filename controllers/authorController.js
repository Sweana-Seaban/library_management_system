const {selectAuthor,insertAuthor,updateAuthor,deleteAuthor, selectAuthors} = require('../database/author_db');

module.exports.displayAuthors = async (req,res) => {
	const authors = await selectAuthors();
	console.log(authors);
	res.send(authors);
    
};

module.exports.displayAuthor = async(req,res) => {
	const id = req.params.id;
	const author = await selectAuthor(id);
	if(!author)
		res.send('Author does not exist');
	else
		res.send(author);
};

module.exports.createAuthor = async(req,res) => {
	const {name} = req.body;
	const author = insertAuthor(name);
	res.send('Author created successfully');
};

module.exports.modifyAuthor = async(req,res) => {
	const id = req.params.id;
	const {name} = req.body;
	const author = updateAuthor(id,name);
	res.send('Author updated successfully');
};

module.exports.removeAuthor = async(req,res) => {
	const id =req.params.id;
	const author = deleteAuthor(id);
	res.send('Author deleted successfully');
};
