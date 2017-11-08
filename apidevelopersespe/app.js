'use strict'
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan');

var mongoose = require('mongoose');

var flash = require('connect-flash');

var config = require('./cfg');

var port = process.env.PORT || 3333;

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true })
    .then(() => {
        console.log('Conexion MongoDB exitosa..!!')
    })
    .catch(err => console.log(err));

var passport = require('./controllers/passport');

//routers
var routerApi = require('./routes/routerApi');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//passport
app.use(session({
    secret: 'holaUniverso:V',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/api', routerApi);

app.listen(port);
console.log('url http://localhost:' + port);