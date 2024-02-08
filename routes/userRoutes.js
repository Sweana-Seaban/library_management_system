const express = require("express");
const route = express.Router();
const {body,validationResult} = require("express-validator");

const {authenticateToken, refreshTokenAuthenticate} = require("../middleware");

const userController = require("../controllers/userController");

route.get("/view/users",authenticateToken,userController.displayUsers);

route.get("/view/users/:id",authenticateToken,userController.displayUserById);

route.post("/store/users",[
	body("email").notEmpty().isEmail().withMessage("Enter a valid email"),
	body("password").notEmpty().isLength({min:5}).withMessage("Enter minimum 5 characters for password"),
	body("name").notEmpty().withMessage("Enter a valid name"),
	body("isAdmin").notEmpty().withMessage("Enter a valid value")
],async(req,res,next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.json({errors:errors.array()});
	}
	next();
},authenticateToken,userController.createUser
);

route.put("/store/users/:id",[
	body("email").isEmail().withMessage("Enter a valid email"),
	body("password").isLength({min:5}).withMessage("Enter minimum 5 characters for password")
],async(req,res,next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.json({errors:errors.array()});
	}
	next();
},authenticateToken,userController.changeUser);

route.post("/user/login",userController.userLogin);

route.delete("/delete/users/:id",authenticateToken,userController.removeUser);

route.post("/token",refreshTokenAuthenticate);

module.exports = route;