const express = require('express');
const router = express.Router();
const path = require('path');




const controllersApointments = require(path.resolve(__dirname, '..', 'controllers', 'controllersApointments'));
//armo mis rutas

router.get('/turnos', controllersApointments.turnos);
router.get('/filtroTurnos', controllersApointments.filtroTurnos);
router.post('/filtrarTurnos', controllersApointments.filtrarTurnos);
router.post('/addevent', controllersApointments.addEvent);
router.get('/eleminarTurno', controllersApointments.delete);
module.exports = router;
