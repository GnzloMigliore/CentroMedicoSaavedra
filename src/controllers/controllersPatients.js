
const path = require('path');
const fs = require('fs');
const { Op } = require("sequelize");
const {patients,medicalhistories} = require ('../database/models');

const {
  check,
  validationResult,
  body
} = require('express-validator');


module.exports = {
  index: async (req, res) => {
    //const usuario = await users.findAll()
    const paciente = await patients.findAll()
    //return res.send(req.session.usuario)
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
    dni: req.body.dni,
    medical_insurance: req.body.obrasocial,
    insurance_number: req.body.numero,
    adress: req.body.dirección,
    adress_number: req.body.adress_number,    
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
   

};     
  patients.create(patient_body)


.then((patientcreate) => {
     return res.redirect('/patients');
})  
.catch(error => res.render(path.resolve(__dirname , '..','views','patients','patientCreate'), {
  errors: errors.errors,  old: req.body}))  
},
show: async (req,res)=>{
  const paciente = await patients.findByPk(req.params.id, {include: ['medicalhistories']})
 

  res.render(path.resolve(__dirname , '..','views','patients','patientDetail') , {paciente});   
},
addhistory: async (req,res)=>{
  
 
  const historiaclinica = await medicalhistories.findAll()
 

  let medicalhistory_body={
    visitamedica: req.body.visita_medica,
    patient_id:req.params.id,
  }; 


  let newmedicalhistory =  await medicalhistories.create({
  visitamedica: req.body.visita_medica,
  patient_id:req.params.id,
  })
 
  //return res.send(newmedicalhistory)
  const medicalhistory = await medicalhistories.findOne({where:{patient_id:req.params.id}})
  const patient_id = {
    medicalhistory_id: medicalhistory.id
  }
  const paciente = await patients.update(patient_id, {where: {id:req.params.id}})
  //res.render(path.resolve(__dirname , '..','views','patients','patientDetail') , {paciente}); 
  res.redirect(`/patients/detail/${paciente.id}`)
  
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
      dni: req.body.dni,
      medical_insurance: req.body.obrasocial,
      insurance_number: req.body.numero,
      adress: req.body.dirección,
      adress_number: req.body.adress_number,
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
     
      
    };     
    patients.create(patient_body)
    .then((patientcreate) => {
      return res.redirect('/patients');
    })  
    .catch(error => res.render(path.resolve(__dirname , '..','views','patients','patientCreate'), {
      errors: errors.errors,  old: req.body}))  
    },
 
    destroy: async (req, res) => {
      let destroyPatient = await patients.destroy({where: {id: req.params.id}, force: true})
      
      res.redirect('/patients')
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
    },
    inteligent: async (req,res) => {
      const paciente = await patients.findAll();
      
      res.render(path.resolve(__dirname , '..','views','patients','inteligent') , {paciente});                       
      
    },
    inteligentSearch: async (req,res)=>{


      const paciente = await patients.findAll({where: {
        first_name: {[Op.like]: `%${req.body.nombre}%`},
        last_name: {[Op.like]: `%${req.body.apellido}`},
        gender: {[Op.like]: `%${req.body.genero}`},
        medical_insurance: {[Op.like]: `%${req.body.obraSocial}%`},
        [Op.or]: {
          diabetes: {[Op.like]: `%${req.body.diabetes}`},
          dlp: {[Op.like]: `%${req.body.dlp}`},
          hta: {[Op.like]: `%${req.body.hta}`},
          crm: {[Op.like]: `%${req.body.crm}`},
          atc: {[Op.like]: `%${req.body.atc}`},
          iam: {[Op.like]: `%${req.body.iam}`},
          acv: {[Op.like]: `%${req.body.acv}`},
          aortic_aneurysm: {[Op.like]: `%${req.body.aneurisma}`},
          ic: {[Op.like]: `%${req.body.ic}`},
          evp: {[Op.like]: `%${req.body.evp}`},
          epoc: {[Op.like]: `%${req.body.epoc}`},
          irc: {[Op.like]: `%${req.body.irc}`},
          obesity: {[Op.like]: `%${req.body.obesidad}`}
        },
        nhc: {[Op.like]: `%${req.body.nhc}%`}
      }});

      console.log('oooooooooooooooooooooooooooooooooo' + paciente.diabetes);
      
      //return res.send(paciente)


      res.render(path.resolve(__dirname, '..', 'views', 'patients', 'resultados'), {paciente})

      /*


      let param = {
        first_name: '',
        last_name: '',
        gender: ["mujer","hombre"],
        medical_insurance: "",
        diabetes: ["on",null],
        dlp: ["on",null],
        hta: ["on",null],
        crm: ["on",null],
        atc: ["on",null],
        iam: ["on",null],
        acv: ["on",null],
        aortic_aneurysm: ["on",null],
        ic: ["on",null],
        evp: ["on",null],
        epoc: ["on",null],
        irc: ["on",null],
        obesity: ["on",null],
        nhc: "",
        
        
      };
      let paciente = await patients.findAll({
        where:{
          first_name: {[Op.like]: `%${param.nombre}%`},
          last_name: {[Op.like]: `%${param.apellido}%`},
          gender: param.gender,
          medical_insurance: {[Op.like]: `%${param.ObraSocial}%`},
          diabetes: {[Op.or]: param.diabetes},
          dlp: {[Op.or]: param.dlp},
          hta: {[Op.or]: param.hta},
          crm: {[Op.or]: param.crm},
          atc: {[Op.or]: param.atc},
          iam: {[Op.or]: param.iam},
          acv: {[Op.or]: param.acv},
          aortic_aneurysm: {[Op.or]: param.aortic_aneurysm},
          ic: {[Op.or]: param.ic},
          evp: {[Op.or]: param.evp},
          epoc: {[Op.or]: param.epoc},
          irc: {[Op.or]: param.irc},
          obesity: {[Op.or]: param.obesity},
          nhc: {[Op.like]: `%${param.nhc}%`},
          
        }
        
      })
      
      //return res.send(paciente)
      .then(paciente => res.render(path.resolve(__dirname, '..', 'views', 'patients', 'resultados'), {paciente}))
    .catch((error)=> res.send(error))*/
    }
  }
  
  
  