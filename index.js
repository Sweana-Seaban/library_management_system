const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json())



app.listen(3000,() => {
    console.log('Serve listening on port 3000');
})