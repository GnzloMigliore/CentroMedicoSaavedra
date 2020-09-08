const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const {
  check,
  validationResult,
  body
} = require('express-validator');

//Requiero Controladores
const controllersUser = require(path.resolve(__dirname, '..', 'controllers', 'controllersUser'));

//Requiero middlewares
const validacionRegistro = require(path.resolve(__dirname, '..', 'middlewares', 'validacionRegistro'));
const validacionAcceso = require(path.resolve(__dirname, '..', 'middlewares', 'validacionAcceso'));

//armo mis rutas

router.get('/registro', controllersUser.registro);
router.post('/registro',[validacionRegistro], controllersUser.create);
router.post('/login',[validacionAcceso], controllersUser.login);
router.get('/logout',[validacionAcceso], controllersUser.logout)

module.exports = router;

