const express = require('express');
const bodyParser = require('body-parser');
const itemsRouter = require('./backend/routes/router');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/items', itemsRouter);
app.use('/', (req, res) => res.send('Todoserver - Metehan Cetinkaya'));

module.exports = app;