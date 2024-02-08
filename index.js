const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");

app.use(express.json());

app.use(userRoutes);
app.use(bookRoutes);
app.use(authorRoutes);

app.get("/", (req, res) => {
	res.send("Server running");
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
