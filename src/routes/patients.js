const express = require('express');
const router = express.Router();
const path = require('path');

//Requiero middlewares
const patientCreate = require(path.resolve(__dirname, '..', 'middlewares', 'patientCreate'));

//Requiero controller
const controllersPatients = require(path.resolve(__dirname, '..', 'controllers', 'controllersPatients'));
//armo mis rutas
const userLogueado = require(path.resolve(__dirname, '..', 'middlewares', 'userLogueado'));

router.get('/patients', controllersPatients.index);
router.get('/patients/create', controllersPatients.create);
router.post('/patients/create', patientCreate, controllersPatients.save);
router.get('/patients/detail/:id', controllersPatients.show);
router.post('/patients/detail/history/:id', controllersPatients.addhistory);
router.post('/patients/detail/treatment/:id', controllersPatients.addtreatment);
router.get("/patients/edit/:id", controllersPatients.edit);
router.post("/patients/edit/:id",controllersPatients.updatePatients);



//rutas de filtros
router.get('/patients/generoh', controllersPatients.generoh);
router.get('/patients/generom', controllersPatients.generom);
router.get('/patients/obesos', controllersPatients.obesos);
router.get('/patients/diabetes', controllersPatients.diabetes);
router.get('/patients/acv', controllersPatients.acv);
router.get('/patients/aneurisma', controllersPatients.aneurisma);
router.post('/busqueda', controllersPatients.search);
router.get("/inteligent", controllersPatients.inteligent);
router.post('/busquedaInteligente', controllersPatients.inteligentSearch);
module.exports = router;
