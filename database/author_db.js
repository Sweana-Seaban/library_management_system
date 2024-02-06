const Sequelize = require('sequelize')
const {DataTypes,Op} = require('sequelize')


const sequelize = new Sequelize('library_management_system','root','password',{
    dialect:'mysql'
})

// sequelize.authenticate().then(() => {
//     console.log('Connected to database successfully');
// }).catch(() => {
//     console.log('Error while connecting to database');
// })

const Author = sequelize.define('author',{
    author_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    author_name:DataTypes.STRING
},{timestamps:false});



// Author.sync({alter:true}).then(() => {
//     console.log('Authors table created successfully');
// }).catch(() => {
//     console.log('Error while creating table');
// })

//select all authors
const selectAuthors = async() => {
    const authors = await Author.findAll()
    return authors
}

//select author by id
const selectAuthor = async(id) => {
    return(await Author.findByPk(id))
}

//insert author
const insertAuthor = async(name) => {
    const author = Author.create({
        author_name:name
    })
    return(author)
}

//update author
const updateAuthor = async(id,name) => {
    const author = Author.update({
        author_name:name
    },{where:{author_id:id}})
}

//delete author
const deleteAuthor = async(id) => {
    const author = Author.findOne({where:{author_id:id}})
}

module.exports ={selectAuthors, selectAuthor, insertAuthor, updateAuthor,deleteAuthor}
// module.exports = Author