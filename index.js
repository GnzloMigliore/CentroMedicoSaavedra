var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//requiero las rutas
const webRouter = require('./src/routes/web');
const userRouter = require('./src/routes/users');

app.use(webRouter);
app.use(userRouter);





app.listen(3000,'localhost',() =>  console.log('servidor corriendo en el puerto 3000'));


module.exports = app;

