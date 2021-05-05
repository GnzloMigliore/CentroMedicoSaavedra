const express = require('express');
const router = express.Router();
const path = require('path');

const fs = require('fs');
const {
  check,
  validationResult,
  body
} = require('express-validator');
const {users} = require ('../database/models');

//Requiero Controladores
const controllersUser = require(path.resolve(__dirname, '..', 'controllers', 'controllersUser'));

//Requiero middlewares
const userLogueado = require(path.resolve(__dirname, '..', 'middlewares', 'userLogueado'));
const validacionRegistro = require(path.resolve(__dirname, '..', 'middlewares', 'validacionRegistro'));
const validacionAcceso = require(path.resolve(__dirname, '..', 'middlewares', 'validacionAcceso'));
const recover = require(path.resolve(__dirname, '..', 'middlewares', 'recover'));
const validacionrecover = require(path.resolve(__dirname, '..', 'middlewares', 'validacionrecover'));
//armo mis rutas


router.post('/login',[validacionAcceso], controllersUser.login);
router.get('/logout',[validacionAcceso], controllersUser.logout);
router.get('/recover', controllersUser.recover);
router.get('/newpassword/:id', controllersUser.newpassword);
router.post('/updatepassword/:id',[validacionrecover], controllersUser.updatepassword);
router.get('/mensajeenviado', controllersUser.mensajeenviado);
router.get('/usernotfound', controllersUser.usernotfound);
router.post('/sendemail', controllersUser.sendemail);
  


router.get('/profile',[userLogueado], controllersUser.show);
router.get('/profile/editar/:id',[userLogueado], controllersUser.profile);
router.post('/profile/editar/:id', controllersUser.update);
router.get('/profile/editar/delete/:id', controllersUser.destroy);
module.exports = router;


