const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db')
const favoritesRoute = require('./routes/favoritesRoute');

const app = express();
const PORT = 3001;
connectDB();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-type', 'Authorization']
}))

app.use('/api', favoritesRoute);

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log('Ready on port ' + PORT);
})

module.exports = app;
