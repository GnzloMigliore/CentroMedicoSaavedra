const express = require('express');
const router = express.Router();
const path = require('path');




const controllersWeb = require(path.resolve(__dirname, '..', 'controllers', 'controllersPatients'));
//armo mis rutas

router.get('/patients', controllersWeb.index);
router.get('/patients/create', controllersWeb.create)
module.exports = router;
