
const path = require('path');
const fs = require('fs');
const { Op } = require("sequelize");
const {patients} = require ('../database/models');
const {
  check,
  validationResult,
  body
} = require('express-validator');


module.exports = {
  index: async (req, res) => {
  
    const paciente = await patients.findAll()
    res.render(path.resolve(__dirname , '..','views','patients','patients'),{paciente}); 
},
create: async (req, res) => {
    res.render(path.resolve(__dirname , '..','views','patients','patientCreate')); 
},
save: async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.render(path.resolve(__dirname , '..','views','patients','patientCreate'), {
          errors: errors.errors,  old: req.body
      });
    }
  let patient_body={
    first_name: req.body.nombre,
    last_name : req.body.apellido,
    gender : req.body.genero,
    date : req.body.nacimiento,
    email: req.body.email,
    medical_insurance: req.body.ObraSocial,
    insurance_number: req.body.numero,
    adress: req.body.dirección,
    telephone: req.body.telefono,
    diabetes: req.body.diabetes,    
    dlp: req.body.dlp,
    hta: req.body.hta,
     crm: req.body.crm,
     atc: req.body.atc,
     acv: req.body.acv,
     aortic_aneurysm: req.body.aneurisma,
     ic: req.body.ic,
     evp: req.body.evp,
     epoc: req.body.epoc,
     irc: req.body.irc,
     obesity: req.body.obesidad,
     nhc: req.body.nhc,
     dlp: req.body.dlp,
     section: req.body.seccion,
     medical_visit: req.body.visita_medica,

};     
patients.create(patient_body)
.then((patientcreate) => {
     return res.redirect('/patients');
})  
.catch(error => res.render(path.resolve(__dirname , '..','views','patients','patientCreate'), {
  errors: errors.errors,  old: req.body}))  
},
show: async (req,res)=>{
  let paciente = await patients.findOne({
    where: {
        id: req.params.id
    }
});

  res.render(path.resolve(__dirname , '..','views','patients','patientDetail') , {paciente});   
},
edit: async (req,res) => {
  const paciente = await patients.findByPk(req.params.id)
  
  res.render(path.resolve(__dirname , '..','views','patients','patientsEdit') , {paciente});                       
  
},
updatePatients: async (req,res) => {


  const patient_body = { 
      //return res.send(_body);
      first_name: req.body.nombre,
      last_name : req.body.apellido,
      gender : req.body.genero,
      date : req.body.nacimiento,
      email: req.body.email,
      medical_insurance: req.body.ObraSocial,
      insurance_number: req.body.numero,
      adress: req.body.dirección,
      telephone: req.body.telefono,
      diabetes: req.body.diabetes,    
      dlp: req.body.dlp,
      hta: req.body.hta,
       crm: req.body.crm,
       atc: req.body.atc,
       acv: req.body.acv,
       aortic_aneurysm: req.body.aneurisma,
       ic: req.body.ic,
       evp: req.body.evp,
       epoc: req.body.epoc,
       irc: req.body.irc,
       obesity: req.body.obesidad,
       nhc: req.body.nhc,
       dlp: req.body.dlp,
       section: req.body.seccion,
       coments: req.body.comentario,
  }
  

  let newpatient = await patients.update( patient_body, {where: {id: req.params.id}})
  
  

  res.redirect("/patients")
},
destroy: async (req, res) => {
  let destroyPatient = await patients.destroy({where: {id: req.params.id}, force: true})
  
  res.redirect('/patients')
},
inteligent: async (req,res) => {
  const paciente = await patients.findAll();
  
  res.render(path.resolve(__dirname , '..','views','patients','inteligent') , {paciente});                       
  
},
//filtros
generom: async (req, res) => {
  let paciente = await patients.findAll({where: {gender: 'mujer'}})
  //return res.send(paciente)
  res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
},
generoh: async (req, res) => {
  let paciente = await patients.findAll({where: {gender: 'hombre'}})
  //return res.send(zapatillas)
  res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
},
obesos: async (req, res) => {
  let paciente = await patients.findAll({where: {obesity: 'on'}})
  //return res.send(zapatillas)
  res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
},
diabetes: async (req, res) => {
  let paciente = await patients.findAll({where: {diabetes: 'on'}})
  //return res.send(zapatillas)
  res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
},
acv: async (req, res) => {
  let paciente = await patients.findAll({where: {acv: 'on'}})
  //return res.send(zapatillas)
  res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
},
aneurisma: async (req, res) => {
  let paciente = await patients.findAll({where: {aortic_aneurysm: 'on'}})
  //return res.send(zapatillas)
  res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
},
search:async (req,res)=>{

  let paciente = await patients.findAll({
      where:{
          [Op.or]: [{first_name: {[Op.like]: `%${req.body.search}%`}},{$last_name$: {[Op.like]: `%${req.body.search}%`}}]
      }
    
  })
  //return res.send(paciente)
  .then(paciente => res.render(path.resolve(__dirname, '..', 'views', 'patients', 'resultados'), {paciente}))
  .catch((error)=> res.send(error))
}
}
