const express = require('express');
const router = express.Router();
const path = require('path');




const controllersApointments = require(path.resolve(__dirname, '..', 'controllers', 'controllersApointments'));
//armo mis rutas

router.get('/turnos', controllersApointments.index);
router.get('/addevent', controllersApointments.addEvent);
module.exports = router;
