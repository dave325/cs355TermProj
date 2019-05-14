"use strict";
// Test for docker
require('dotenv').config();
var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// Load the databaes information
const routes = require('./routes/routes');
const frontend = require('./routes/angularRoutes.js');
const app = express();
const fs = require('fs');
const db = require('./app_api/config/db'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Connect to the backend, all files located in app_api
app.use(express.static(path.join(__dirname, 'tmp')));
app.use(express.static(path.join(__dirname, 'dist')));
//apply routes

app.use('/', frontend);
app.use("/api", routes);

process.stdin.resume();//so the program will not close instantly
function exit(){
  db.end();
}


//do something when app is closing
process.on('exit', ()=> {
  db.end();
});

//catches ctrl+c event
process.on('SIGINT', ()=> {   db.end(); process.exit(); });

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', ()=> {   db.end(); process.exit();});
process.on('SIGUSR2', ()=> {   db.end(); process.exit();});

//catches uncaught exceptions
process.on('uncaughtException', ()=> {   db.end(); process.exit();});
module.exports = app;