const express = require('express');
const router = express.Router();
const path = require('path');

//Requiero middlewares
const patientCreate = require(path.resolve(__dirname, '..', 'middlewares', 'patientCreate'));
//Requiero controller
const controllersPatients = require(path.resolve(__dirname, '..', 'controllers', 'controllersPatients'));
//armo mis rutas
const userLogueado = require(path.resolve(__dirname, '..', 'middlewares', 'userLogueado'));

router.get('/patients',userLogueado, controllersPatients.index);
router.get('/patients/create',userLogueado, controllersPatients.create);
router.post('/patients/create',userLogueado, patientCreate, controllersPatients.save);
router.get('/patients/detail/:id',userLogueado, controllersPatients.show);
router.get("/patients/edit/:id",userLogueado, controllersPatients.edit);
router.post("/patients/edit/:id",userLogueado, controllersPatients.updatePatients);
router.get("/patients/delete/:id",userLogueado, controllersPatients.destroy);
router.get("/inteligent",userLogueado, controllersPatients.inteligent);

//rutas de filtros
router.get('/patients/generoh',userLogueado, controllersPatients.generoh);
router.get('/patients/generom',userLogueado, controllersPatients.generom);
router.get('/patients/obesos',userLogueado, controllersPatients.obesos);
router.get('/patients/diabetes',userLogueado, controllersPatients.diabetes);
router.get('/patients/acv', controllersPatients.acv);
router.get('/patients/aneurisma',userLogueado, controllersPatients.aneurisma);
router.post('/busqueda',userLogueado, controllersPatients.search);
module.exports = router;
