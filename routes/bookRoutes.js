const express = require('express')
const route = express.Router();
const {body, validationResult} = require('express-validator')

const {homePage,displayBook,displayBooks,createBook,modifyBook,removeBook} = require('../controllers/bookController')

route.get('/',homePage);

route.get('/books',displayBooks);

route.get('/book/:id',displayBook);

route.post('/book',[
    body('title').isEmpty().withMessage('Title should not be empty'),
    body('genre').isEmpty().withMessage('Genre should not be empty'),
    body('price').isNumeric().withMessage('Price should be a number')
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    }
    createBook
});

route.put('/book/:id',[
    body('price').isNumeric().withMessage('Price should be a number')
],async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    }
    modifyBook
});

route.delete('/book/:id',removeBook);

module.exports = route