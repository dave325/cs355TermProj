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

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // Connect to the backend, all files located in app_api
  app.use(express.static(path.join(__dirname, 'tmp')));
  app.use(express.static(path.join(__dirname, 'dist')));
  //apply routes
  app.use('/', frontend);
  app.use("/api", routes);


module.exports = app;