const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');






// Requiero el middleware para recordar el usuario en la vista
const userMiddleware = require('./middlewares/user');
const recordarUser = require ('./middlewares/recordarUser');
// view engine setup
app.set('views', path.join(__dirname,'..', 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '..','public')))
// Aquí requerimos nuestros middlewares de session y cookies
app.use(session({
    secret : 'topSecret',
    resave: true,
    saveUninitialized: true,
}));

//requiero las rutas
const webRouter = require('./routes/web');
const userRouter = require('./routes/users');
const patientsRouter = require('./routes/patients')

app.use(webRouter);
app.use(userRouter);
app.use(patientsRouter);


// Requiero el middleware para recordar el usuario en la vista
app.use(recordarUser);
app.use(userMiddleware);



app.listen(3000,'localhost',() =>  console.log('servidor corriendo en el puerto 3000'));


module.exports = app;

