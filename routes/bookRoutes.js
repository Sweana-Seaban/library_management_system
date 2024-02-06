const express = require('express')
const route = express.Router();
const {body, validationResult} = require('express-validator')

const {homePage,displayBook,displayBooks,createBook,modifyBook,removeBook} = require('../controllers/bookController')

route.get('/',homePage);

route.get('/view/books',displayBooks);

route.get('/view/books/:id',displayBook);

route.post('/store/books',[
    body('title').notEmpty().withMessage('Title should not be empty'),
    body('genre').notEmpty().withMessage('Genre should not be empty'),
    body('price').isNumeric().withMessage('Price should be a number')
],async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    }
    next();
},createBook);

route.put('/store/books/:id',[
    body('price').isNumeric().withMessage('Price should be a number')
], (req,res, next) => {
    console.log("Inside last middleware");
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    }
    next();
    //modifyBook(req,res)
},modifyBook );

route.delete('/delete/books/:id',removeBook);

module.exports = route