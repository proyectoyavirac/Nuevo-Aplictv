'use strict'
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('./cfg');

var port = process.env.PORT || 3333;

mongoose.Promise = global.Promise;
  .then(() => {
    console.log('Conexion MongoDB exitosa..!!')
  })
  .catch(err => console.log(err));

//routers
var routerApi = require('./routes/routerApi');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', routerApi);

app.listen(port);
console.log('url http://localhost:' + port);
