const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const itemsRouter = require('./backend/routes/router');

const app = express();

const mongodb_uri = 'mongodb+srv://metehancetinkaya:test123@todoappcluster.sfjgqcf.mongodb.net/?retryWrites=true&w=majority';

mongoose
    .connect(mongodb_uri).then(() => console.log('Connected to database '))
    .catch(err => console.error(`Error connecting to the database. \n${err}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/items', itemsRouter);
app.use('/', (req, res) => res.send('TodoApp - Metehan Cetinkaya'));

const server = http.createServer(app);
const port = 3001;

server.listen(port);
console.debug(`Server listening on port ${ port }`);





// require('./database')

// const { createWindow } = require('./frontend/main');
// const { app } = require('electron');

// app.whenReady().then(createWindow);