const {
	selectUsers,
	selectUserById,
	insertUser,
	updateUser,
	deleteUser,
	findUser,
} = require("../database/user_db");
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
require("dotenv").config();
const { generateAccessToken } = require("../middleware");

//select all
module.exports.displayUsers = async (req, res) => {
	const users = await selectUsers();
	res.json(users.filter((user) => user.user_name === req.user.name));
};

//select by id
module.exports.displayUserById = async (req, res) => {
	const user_id = req.params.id;
	const user = await selectUserById(user_id);
	if (user) {
		if (user.user_name === req.user.name) res.send(user);
		else res.sendStatus(403);
	} else res.send("User does not exist");
};

//create user
module.exports.createUser = async (req, res) => {
	if (req.user.isAdmin) {
		const { name, email, password, isAdmin } = req.body;
		bcrypt.hash(password, 10).then(async (hash) => {
			const createdUser = await insertUser(name, email, hash, isAdmin);
			res.send(createdUser);
		});
	} else {
		res.send("Unauthenticated");
	}
};

//update user
module.exports.changeUser = async (req, res) => {
	if (req.user.isAdmin) {
		//console.log('starting query');
		const id = req.params.id;
		const { name, email, password, isAdmin } = req.body;
		bcrypt.hash(password, 10).then(async (hash) => {
			const changedUser = await updateUser(id, name, email, hash, isAdmin);
			res.send("User updated successfully");
		});
	} else {
		res.send("Unauthenticated");
	}
};

//delete user
module.exports.removeUser = async (req, res) => {
	if (req.user.isAdmin) {
		const id = req.params.id;
		const user = await deleteUser(id);
		res.send("User deleted successfully");
	} else {
		res.send("Unauthenticated");
	}
};

module.exports.userLogin = async (req, res) => {
	const { email, password } = req.body;
	const requesteduser = await findUser(email);
	if (requesteduser) {
		bcrypt
			.compare(password, requesteduser.user_password)
			.then(function (result) {
				result
					? console.log("Login Successful")
					: console.log("Login not successful"); //incorrect password
				const user = {
					name: requesteduser.user_name,
					password: requesteduser.user_password,
					isAdmin: requesteduser.user_isAdmin,
				};
				const accessToken = generateAccessToken(user);
				const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
				res.json({ accessToken: accessToken, refreshToken: refreshToken });
			});
	} else {
		res.send("Login not succesful"); //incorrect email
	}
};
