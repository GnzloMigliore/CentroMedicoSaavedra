const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
//const logger = require('morgan');
const session = require('express-session');






// Requiero el middleware para recordar el usuario en la vista

const recordarUser = require ('./src/middlewares/recordarUser');
// view engine setup
app.set('views', path.join(__dirname,'..', 'views'));
app.set('view engine', 'ejs');

// Aquí requerimos nuestros middlewares de session y cookies
app.use(session({
    secret : 'topSecret',
    resave: true,
    saveUninitialized: true,
}));
//Aqui coloco el Middleware para activar lo referido a las cookies
app.use(cookieParser());

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname,'public')))

// Requiero el middleware para recordar el usuario en la vista
app.use(recordarUser);

//requiero las rutas
const webRouter = require('./src/routes/web');
const userRouter = require('./src/routes/users');
const patientsRouter = require('./src/routes/patients')
const apointmentsRouter = require('./src/routes/apointments')
const adminUsersRouter = require('./src/routes/adminUsers')
app.use(webRouter);
app.use(userRouter);
app.use(patientsRouter);
app.use(apointmentsRouter);
app.use(adminUsersRouter);
// Requiero el middleware para recordar el usuario en la vista





app.listen(3000,'localhost',() =>  console.log('servidor corriendo en el puerto 3000'));


module.exports = app;

