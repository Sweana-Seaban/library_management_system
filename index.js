const express = require('express');
const app = express();
const route = require('./routes/userRoutes');
app.use(express.json())

app.use('/',route);

app.listen(3000,() => {
    console.log('Server listening on port 3000');
})