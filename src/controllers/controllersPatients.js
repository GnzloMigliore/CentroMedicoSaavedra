
const path = require('path');
const fs = require('fs');
const { Op } = require("sequelize");
const {patients, medicalhistories,treatments} = require ('../database/models');

const {
  check,
  validationResult,
  body
} = require('express-validator');



module.exports = {
  index: async (req, res) => {
    //const usuario = await users.findAll()
    const paciente = await patients.findAll()
    const tratamiento = await treatments.findAll()
    //return res.send(tratamiento)
    res.render(path.resolve(__dirname , '..','views','patients','patients'),{paciente, tratamiento}); 
    
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
      nhc: req.body.nhc,
      diabetes: req.body.diabetes,
      date_diabetes: req.body.fecha_diabetes,
      action_diabetes: req.body.accion_diabetes,
      coments_diabetes: req.body.comentario_diabetes,    
      dlp: req.body.dlp,
      date_dlp: req.body.fecha_dlp,
      action_dlp: req.body.accion_dlp,
      coments_dlp: req.body.comentario_dlp,  
      hta: req.body.hta,
      date_hta: req.body.fecha_hta,
      action_hta: req.body.accion_hta,
      coments_hta: req.body.comentario_hta,  
      crm: req.body.crm,
      date_crm: req.body.fecha_crm,
      action_crm: req.body.accion_crm,
      coments_crm: req.body.comentario_crm,  
      atc: req.body.atc,
      date_atc: req.body.fecha_atc,
      action_atc: req.body.accion_atc,
      coments_atc: req.body.comentario_atc, 
      acv: req.body.acv,
      date_iam: req.body.fecha_iam,
      action_iam: req.body.accion_iam,
      coments_iam: req.body.comentario_iam, 
      acv: req.body.acv,
      date_acv: req.body.fecha_acv,
      action_acv: req.body.accion_acv,
      coments_acv: req.body.comentario_acv, 
      aortic_aneurysm: req.body.aneurisma,
      date_aerotic: req.body.fecha_aneurisma,
      action_aerotic: req.body.accion_aneurisma,
      coments_aerotic: req.body.comentario_aneurisma, 
      ic: req.body.ic,
      date_ic: req.body.fecha_ic,
      action_ic: req.body.accion_ic,
      coments_ic: req.body.comentario_ic, 
      evp: req.body.evp,
      date_evp: req.body.fecha_evp,
      action_evp: req.body.accion_evp,
      coments_evp: req.body.comentario_evp, 
      epoc: req.body.epoc,
      date_epoc: req.body.fecha_epoc,
      action_epoc: req.body.accion_epoc,
      coments_epoc: req.body.comentario_epoc, 
      irc: req.body.irc,
      date_irc: req.body.fecha_irc,
      action_irc: req.body.accion_irc,
      coments_irc: req.body.comentario_irc, 
      obesity: req.body.obesidad,
      date_obesity: req.body.fecha_obesidad,
      action_obesity: req.body.accion_obesidad,
      coments_obesity: req.body.comentario_obesidad, 
    
    };     
    //Guardo el paciente creado en una variable para despues poder llamarlo cuando creo la historia clinica
    let newPaciente = await patients.create(patient_body)
    //console.log('ooooooooooooooooooooo' + newPaciente.id);
    //Guardo en la variable los datos que quiero que se creen en la historia clinica
    let patientsid_body = {patient_id: newPaciente.id}
    //Hago el create de la historia clinica pasandole la variable declarada acá arriba
    await medicalhistories.create(patientsid_body);
   
    //Hago el create de treatments pasandole la variable declarada acá arriba
    await treatments.create(patientsid_body);

    res.redirect('/patients')
    },
    show: async (req,res)=>{
      const paciente = await patients.findByPk(req.params.id)
      const historiaClinica = await medicalhistories.findAll({where: {patient_id: req.params.id}, order: [['createdAt', 'DESC']]})
      const tratamiento = await treatments.findAll({where: {patient_id: req.params.id}, order: [['createdAt', 'DESC']]})
      //return res.send(tratamiento) 
      
      res.render(path.resolve(__dirname , '..','views','patients','patientDetail') , {paciente, historiaClinica, tratamiento});   
    },
    addhistory: async (req,res)=>{
      
      const paciente = await patients.findByPk(req.params.id, {include: ['medicalhistories','treatments']})
      const historiaClinica = await medicalhistories.findOne({where:{patient_id:req.params.id}})
      
      const visita = historiaClinica.visitamedica
      
      let medicalhistory_body={
        visitamedica: req.body.visita_medica
      }; 

      let newMedicalHistory = {
        patient_id: paciente.id,
        visitamedica: req.body.visita_medica
      }
      
      if (visita == null) {
       
        await medicalhistories.update(medicalhistory_body, {where: {patient_id: req.params.id}})
      } else {
        await medicalhistories.create(newMedicalHistory)
      }
      
     //return res.send(newmedicalhistory)
      
      
      
      //return res.send(paciente)
      //res.render(path.resolve(__dirname , '..','views','patients','patientDetail') , {paciente, historiaClinica}); 
      res.redirect(`/patients/detail/${paciente.id}`)
      
    },
     addtreatment: async (req,res)=>{
      const paciente = await patients.findByPk(req.params.id, {include: ['treatments','medicalhistories']})
      const tratamientos = await treatments.findOne({where:{patient_id:req.params.id}})
      
      const tratamiento = tratamientos.tratamiento
      
      let treatments_body={
        tratamiento: req.body.tratamiento
      }; 

      let newTreatment = {
        patient_id: paciente.id,
        tratamiento: req.body.tratamiento
      }
      
      if (tratamiento == null) {
       
        await treatments.update(treatments_body, {where: {patient_id: req.params.id}})
      } else {
        await treatments.create(newTreatment)
      }
    
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
        treatments: req.body.tratamiento,
        nhc: req.body.nhc,
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
      
        dlp: req.body.dlp,
        section: req.body.seccion,
        
        
      };     
      let newPaciente = await patients.update(patient_body, {where: {id: req.params.id}})
      .then((patientcreate) => {
        return res.redirect('/patients');
      })  
      .catch(error => res.render(path.resolve(__dirname , '..','views','patients','patientCreate'), {
        errors: errors.errors,  old: req.body}))  
      },
      
      //filtros
      generom: async (req, res) => {
        let paciente = await patients.findAll({where: {gender: 'femenino'}})
        //return res.send(paciente)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },
      generoh: async (req, res) => {
        let paciente = await patients.findAll({where: {gender: 'masculino'}})
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
            [Op.or]: [{first_name: {[Op.like]: `%${req.body.search}%`}},{$last_name$: {[Op.like]: `%${req.body.search}%`}},{$dni$: {[Op.like]: `%${req.body.search}%`}}]
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
        
        /*const paciente = await patients.findAll({
          where: {
            [Op.or]: [
              {first_name: {[Op.like]: `%${req.body.nombre}%`}},
              {last_name: {[Op.like]: `%${req.body.apellido}`}},
              {gender: {[Op.like]: `%${req.body.genero}`}},
              {medical_insurance: {[Op.like]: `%${req.body.obraSocial}%`}},
              {diabetes: {[Op.like]: `%${req.body.diabetes}`}},
              {dlp: {[Op.like]: `%${req.body.dlp}`}},
              {hta: {[Op.like]: `%${req.body.hta}`}},
              {crm: {[Op.like]: `%${req.body.crm}`}},
              {atc: {[Op.like]: `%${req.body.atc}`}},
              {iam: {[Op.like]: `%${req.body.iam}`}},
              {acv: {[Op.like]: `%${req.body.acv}`}},
              {aortic_aneurysm: {[Op.like]: `%${req.body.aneurisma}`}},
              {ic: {[Op.like]: `%${req.body.ic}`}},
              {evp: {[Op.like]: `%${req.body.evp}`}},
              {epoc: {[Op.like]: `%${req.body.epoc}`}},
              {irc: {[Op.like]: `%${req.body.irc}`}},
              {obesity: {[Op.like]: `%${req.body.obesidad}`}},
              {nhc: {[Op.like]: `%${req.body.nhc}%`}}
            ]
          }
        });*/
        
        const paciente = await patients.findAll({where: {
          [Op.or]: {
            first_name: {[Op.like]: `%${req.body.nombre}%`, [Op.ne]: null},
            last_name: {[Op.like]: `%${req.body.apellido}`, [Op.ne]: null},
            gender: {[Op.like]: `%${req.body.genero}`, [Op.ne]: null},
            medical_insurance: {[Op.like]: `%${req.body.obraSocial}%`, [Op.ne]: null},
            diabetes: {[Op.like]: `%${req.body.diabetes}`, [Op.ne]: null},
            dlp: {[Op.like]: `%${req.body.dlp}`, [Op.ne]: null},
          }
          
        }
      });
      
      
      /*
      dlp: {[Op.like]: `%${req.body.dlp}`, [Op.ne]: null},
      hta: {[Op.like]: `%${req.body.hta}`, [Op.ne]: null},
      crm: {[Op.like]: `%${req.body.crm}`, [Op.ne]: null},
      atc: {[Op.like]: `%${req.body.atc}`, [Op.ne]: null},
      iam: {[Op.like]: `%${req.body.iam}`, [Op.ne]: null},
      acv: {[Op.like]: `%${req.body.acv}`, [Op.ne]: null},
      aortic_aneurysm: {[Op.like]: `%${req.body.aneurisma}`, [Op.ne]: null},
      ic: {[Op.like]: `%${req.body.ic}`, [Op.ne]: null},
      evp: {[Op.like]: `%${req.body.evp}`, [Op.ne]: null},
      epoc: {[Op.like]: `%${req.body.epoc}`, [Op.ne]: null},
      irc: {[Op.like]: `%${req.body.irc}`, [Op.ne]: null},
      obesity: {[Op.like]: `%${req.body.obesidad}`, [Op.ne]: null},
      nhc: {[Op.like]: `%${req.body.nhc}%`, [Op.ne]: null}
      */
      
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
  
  
  