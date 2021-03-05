const express = require('express');
const router = express.Router();
const path = require('path');

//Requiero middlewares
const patientCreate = require(path.resolve(__dirname, '..', 'middlewares', 'patientCreate'));
const patientedit = require(path.resolve(__dirname, '..', 'middlewares', 'patientedit'));
const userLogueado = require(path.resolve(__dirname, '..', 'middlewares', 'userLogueado'));
//Requiero controller
const controllersPatients = require(path.resolve(__dirname, '..', 'controllers', 'controllersPatients'));
//armo mis rutas


router.get('/patients', controllersPatients.index);
router.get('/patients/create', controllersPatients.create);
router.post('/patients/create', patientCreate, controllersPatients.save);
router.get('/patients/detail/:id', controllersPatients.show);
router.post('/patients/detail/history/:id',  controllersPatients.addhistory);
router.post('/patients/detail/treatment/:id', controllersPatients.addtreatment);
router.get('/searchtreatments', controllersPatients.searchtreatments);
router.post('/busquedatratamiento', controllersPatients.searchtreat);
router.post('/busquedadatetratamiento', controllersPatients.searchdatetreat);
router.get('/searchhistory', controllersPatients.searchhistory);
router.post('/busquedahistoria', controllersPatients.searchhist);
router.post('/busquedadatehistory', controllersPatients.searchdatehistory);
router.get('/patients/delete/treatment/:id', controllersPatients.destroy);
router.get('/patients/edit/:id', controllersPatients.edit);
router.post('/patients/edit/:id', patientedit, controllersPatients.updatePatients);



//rutas de filtros
router.get('/patients/generoh', controllersPatients.generoh);
router.get('/patients/generom', controllersPatients.generom);

router.get('/patients/diabetes', controllersPatients.diabetes);
router.get('/patients/dlp', controllersPatients.dlp);
router.get('/patients/hta', controllersPatients.hta);
router.get('/patients/crm', controllersPatients.crm);
router.get('/patients/atc', controllersPatients.atc);
router.get('/patients/iam', controllersPatients.iam);
router.get('/patients/acv', controllersPatients.acv);
router.get('/patients/aneurisma', controllersPatients.aneurisma);
router.get('/patients/ic', controllersPatients.ic);
router.get('/patients/evp', controllersPatients.evp);
router.get('/patients/epoc', controllersPatients.epoc);
router.get('/patients/irc', controllersPatients.irc)
router.get('/patients/obesos', controllersPatients.obesos);
router.post('/busqueda', controllersPatients.search);
router.get("/inteligent", controllersPatients.inteligent);
router.post('/busquedaInteligente', controllersPatients.inteligentSearch);
module.exports = router;
