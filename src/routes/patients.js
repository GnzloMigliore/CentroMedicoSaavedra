const express = require('express');
const router = express.Router();
const path = require('path');



//Requiero middlewares
const patientCreate = require(path.resolve(__dirname, '..', 'middlewares', 'patientCreate'));
//Requiero controller
const controllersPatients = require(path.resolve(__dirname, '..', 'controllers', 'controllersPatients'));
//armo mis rutas

router.get('/patients', controllersPatients.index);
router.get('/patients/create', controllersPatients.create)
router.post('/patients/create', patientCreate, controllersPatients.save)
router.get('/patients/detail/:id', controllersPatients.show);
router.get("/patients/delete/:id", controllersPatients.destroy);

//rutas de filtros
router.get('/patients/generoh', controllersPatients.generoh);
router.get('/patients/generom', controllersPatients.generom);
router.get('/patients/obesos', controllersPatients.obesos);
router.get('/patients/diabetes', controllersPatients.diabetes);
router.get('/patients/acv', controllersPatients.acv);
router.get('/patients/aneurisma', controllersPatients.aneurisma);
module.exports = router;
