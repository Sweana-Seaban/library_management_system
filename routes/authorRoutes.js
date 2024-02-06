const express = require('express')
const route = express.Router();
const {body,validationResult} = require('express-validator')

const {homePage,displayAuthors,displayAuthor,createAuthor,modifyAuthor,removeAuthor} = require('../controllers/authorController')

route.get('/',homePage);

route.get('/view/authors',displayAuthors);

route.get('/view/authors/:id',displayAuthor);

route.post('/store/authors',[
    body('name').notEmpty().withMessage('Please provide an author name')
],async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    }
    next();
},createAuthor);

route.put('/store/authors/:id',modifyAuthor);

route.delete('/delete/authors/:id',removeAuthor);

module.exports = route