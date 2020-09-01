const express = require('express');
const router = express.Router();
const path = require('path');




const controllersWeb = require(path.resolve(__dirname, '..', 'controllers', 'controllersUser'));
//armo mis rutas

router.get('/registro', controllersWeb.registro);
router.post('/registro', controllersWeb.create);
module.exports = router;

