const express = require('express');
const router = express.Router();
const path = require('path');




const controllersWeb = require(path.resolve(__dirname, '..', 'controllers', 'controllersWeb'));
//armo mis rutas

router.get('/', controllersWeb.index);

module.exports = router;
