const express = require("express");
const route = express.Router();
const { body, validationResult } = require("express-validator");

const bookController = require("../controllers/bookController");

route.get("/view/books", bookController.displayBooks);

route.get("/view/books/:id", bookController.displayBook);

route.post(
	"/store/books",
	[
		body("title").notEmpty().withMessage("Title should not be empty"),
		body("genre").notEmpty().withMessage("Genre should not be empty"),
		body("price").isNumeric().withMessage("Price should be a number"),
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ errors: errors.array() });
		}
		next();
	},
	bookController.createBook,
);

route.put(
	"/store/books/:id",
	[body("price").isNumeric().withMessage("Price should be a number")],
	(req, res, next) => {
		console.log("Inside last middleware");
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ errors: errors.array() });
		}
		next();
	},
	bookController.modifyBook,
);

route.delete("/delete/books/:id", bookController.removeBook);

module.exports = route;
