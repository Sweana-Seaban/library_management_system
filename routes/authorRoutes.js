const express = require("express");
const route = express.Router();
const { body, validationResult } = require("express-validator");

const authorController = require("../controllers/authorController");

route.get("/view/authors", authorController.displayAuthors);

route.get("/view/authors/:id", authorController.displayAuthor);

route.post(
	"/store/authors",
	[body("name").notEmpty().withMessage("Please provide an author name")],
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ errors: errors.array() });
		}
		next();
	},
	authorController.createAuthor,
);

route.put("/store/authors/:id", authorController.modifyAuthor);

route.delete("/delete/authors/:id", authorController.removeAuthor);

module.exports = route;
