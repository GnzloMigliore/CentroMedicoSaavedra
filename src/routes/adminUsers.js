const express = require('express');
const router = express.Router();
const path = require('path');


//Requiero middlewares

const adminOnly = require(path.resolve(__dirname, '..', 'middlewares', 'adminOnly'));
const validacionRegistro = require(path.resolve(__dirname, '..', 'middlewares', 'validacionRegistro'));
const validacionEdit = require(path.resolve(__dirname, '..', 'middlewares', 'validacionEdit'));
const controllersAdminUser = require(path.resolve(__dirname, '..', 'controllers', 'controllersAdminUser'));
//armo mis rutas

router.get('/adminusers',[adminOnly], controllersAdminUser.index);

router.get('/registro', [adminOnly], controllersAdminUser.registro);
router.post('/registro',[validacionRegistro],controllersAdminUser.create);
router.post('/update/:id',[validacionEdit], controllersAdminUser.update);
router.get('/editUser/:id', [adminOnly], controllersAdminUser.editar);
router.get('/deleteUser/:id', [adminOnly], controllersAdminUser.delete);
module.exports = router;
