const express = require('express')
const route = express.Router();
const {body,validationResult} = require('express-validator')

const {homePage,displayAuthors,displayAuthor,createAuthor,modifyAuthor,removeAuthor} = require('../controllers/authorController')

route.get('/',homePage);

route.get('/authors',displayAuthors);

route.get('/author/:id',displayAuthor);

route.post('/author',[
    body('name').isEmpty().withMessage('Please provide an author name'),
    body('title').isEmpty().withMessage('Please provide a title'),
    body('genre').isEmpty().withMessage('Please provide a genre'),
    body('price').isNumeric().withMessage('Please provide a number for price')
],async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    }
    createAuthor(req,res)
});

route.put('/author/:id',[
    body('name').isEmpty().withMessage('Please provide an author name')
],async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    }
    modifyAuthor(req,res)
});

route.delete('/author/:id',removeAuthor);

module.exports = route