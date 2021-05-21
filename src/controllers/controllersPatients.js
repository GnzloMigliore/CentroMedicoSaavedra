
const path = require('path');
const fs = require('fs');
const { Op, where } = require("sequelize");
const {patients, medicalhistories,treatments,exams,patienttreatments,images} = require ('../database/models');

const {
  check,
  validationResult,
  body
} = require('express-validator');



module.exports = {
  index: async (req, res) => {
    //const usuario = await users.findAll()
    const paciente = await patients.findAll()
  
    //return res.send(paciente) 
    res.render(path.resolve(__dirname , '..','views','patients','patients'),{paciente}); 
    
  },
  turnos: async (req, res) => {
    res.render(path.resolve(__dirname , '..','views','apointments','apointments')); 
  },
  create: async (req, res) => {
    res.render(path.resolve(__dirname , '..','views','patients','patientCreate')); 
  },
  save: async (req, res) => {
    let patient_body={
      first_name: req.body.nombre,
      last_name : req.body.apellido,
      firstlast_name :req.body.nombre+" "+req.body.apellido,
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
      date_end_diabetes: req.body.fecha_end_diabetes,
      action_diabetes: req.body.accion_diabetes,
      coments_diabetes: req.body.comentario_diabetes,    
      dlp: req.body.dlp,
      date_dlp: req.body.fecha_dlp,
      date_end_dlp: req.body.fecha_end_dlp,
      action_dlp: req.body.accion_dlp,
      coments_dlp: req.body.comentario_dlp,  
      hta: req.body.hta,
      date_hta: req.body.fecha_hta,
      date_end_hta: req.body.fecha_end_hta,
      action_hta: req.body.accion_hta,
      coments_hta: req.body.comentario_hta,  
      crm: req.body.crm,
      date_crm: req.body.fecha_crm,
      date_end_crm: req.body.fecha_end_crm,
      action_crm: req.body.accion_crm,
      coments_crm: req.body.comentario_crm,  
      atc: req.body.atc,
      date_atc: req.body.fecha_atc,
      date_end_atc: req.body.fecha_end_atc,
      action_atc: req.body.accion_atc,
      coments_atc: req.body.comentario_atc, 
      iam: req.body.iam,
      date_iam: req.body.fecha_iam,
      date_end_iam: req.body.fecha_end_iam,
      action_iam: req.body.accion_iam,
      coments_iam: req.body.comentario_iam, 
      acv: req.body.acv,
      date_acv: req.body.fecha_acv,
      date_end_acv: req.body.fecha_end_acv,
      action_acv: req.body.accion_acv,
      coments_acv: req.body.comentario_acv, 
      aortic_aneurysm: req.body.aneurisma,
      date_aerotic: req.body.fecha_aneurisma,
      date_end_aerotic: req.body.fecha_end_aneurisma,
      action_aerotic: req.body.accion_aneurisma,
      coments_aerotic: req.body.comentario_aneurisma, 
      ic: req.body.ic,
      date_ic: req.body.fecha_ic,
      date_end_ic: req.body.fecha_end_ic,
      action_ic: req.body.accion_ic,
      coments_ic: req.body.comentario_ic, 
      evp: req.body.evp,
      date_evp: req.body.fecha_evp,
      date_end_evp: req.body.fecha_end_evp,
      action_evp: req.body.accion_evp,
      coments_evp: req.body.comentario_evp, 
      epoc: req.body.epoc,
      date_epoc: req.body.fecha_epoc,
      date_end_epoc: req.body.fecha_end_epoc,
      action_epoc: req.body.accion_epoc,
      coments_epoc: req.body.comentario_epoc, 
      irc: req.body.irc,
      date_irc: req.body.fecha_irc,
      date_end_irc: req.body.fecha_end_irc,
      action_irc: req.body.accion_irc,
      coments_irc: req.body.comentario_irc, 
      obesity: req.body.obesidad,
      date_obesity: req.body.fecha_obesidad,
      date_end_obesity: req.body.fecha_end_obesidad,
      action_obesity: req.body.accion_obesidad,
      coments_obesity: req.body.comentario_obesidad, 
    
    };  
    
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render(path.resolve(__dirname , '..','views','patients','patientCreate'), {patient_body,
        errors: errors.errors,  old: req.body
      });
    }
    
   
    //return res.send(patient_body) 
    //Guardo el paciente creado en una variable para despues poder llamarlo cuando creo la historia clinica
    let newPaciente = await patients.create(patient_body)

    let patientsid_body1 = {patient_id: newPaciente.id, patient_name:newPaciente.first_name +" "+newPaciente.last_name } 
    //console.log('ooooooooooooooooooooo' + newPaciente.id);
   let newtreatment = await treatments.create(patientsid_body1);
     //return res.send(newtreatment.id)
    //Guardo en la variable los datos que quiero que se creen en la historia clinica
    let patientsid_body = {patient_id: newPaciente.id, treatments_id:newtreatment.id}
      //Hago el create de treatments pasandole la variable declarada acá arriba
    
      await patienttreatments.create(patientsid_body);


      let patientsexam_body = {patient_id: newPaciente.id}
      await exams.create(patientsexam_body);

      let patientsimage_body = {patient_id: newPaciente.id}
      await images.create(patientsimage_body);

      let patientsmh_body = {patient_id: newPaciente.id,  first_name: newPaciente.first_name, last_name: newPaciente.last_name}
    //Hago el create de la historia clinica pasandole la variable declarada acá arriba
    await medicalhistories.create(patientsmh_body);
   
  

    res.redirect('/patients')
    },
    show: async (req,res)=>{
      const paciente = await patients.findByPk(req.params.id, {include: ['treatments']})
      const tratamiento = await treatments.findAll({where: {patient_id: req.params.id}, order: [['datetreatment', 'DESC']]})
      const historiaClinica = await medicalhistories.findAll({where: {patient_id: req.params.id}, order: [['visitamedica', 'DESC']]})
    
      
      
      res.render(path.resolve(__dirname , '..','views','patients','patientDetail') , {paciente, historiaClinica,tratamiento });   
    },
    addhistory: async (req,res)=>{
   
      const paciente = await patients.findByPk(req.params.id, {include: ['medicalhistories','treatments']})
      const historiaClinica = await medicalhistories.findOne({where:{patient_id:req.params.id}})

      const visita = historiaClinica.visitamedica
      
      let medicalhistory_body={
        visitamedica: req.body.visita_medica,
        fechavisita: req.body.fechavisita,
        doctor: req.body.doctor,
        first_name: paciente.first_name,
        last_name: paciente.last_name

      }; 

      let newMedicalHistory = {
        patient_id: paciente.id,
        visitamedica: req.body.visita_medica,
        fechavisita: req.body.fechavisita,
        doctor: req.body.doctor,
        first_name: paciente.first_name,
        last_name: paciente.last_name
      }
      
      if (visita == null) {
       
        await medicalhistories.update(medicalhistory_body, {where: {patient_id: req.params.id}})
      } else {
        await medicalhistories.create(newMedicalHistory)
      }
      
     //return res.send(newmedicalhistory)
      
      
      
      //return res.send(paciente)
      //res.render(path.resolve(__dirname , '..','views','patients','patientDetail') , {paciente, historiaClinica}); 
      res.redirect(`/patientsHistory/${paciente.id}`)
      
    },
     addtreatment: async (req,res)=>{
      const paciente = await patients.findByPk(req.params.id, {include: ['medicalhistories','treatments']})
      const tratamientos = await treatments.findOne({where:{patient_id:req.params.id}})
      const tratamiento = tratamientos.tratamiento
      
      let treatments_body={
        
        tratamiento: req.body.tratamiento,
        firstname_patient: paciente.first_name,
        lastname_patient: paciente.last_name,
        datetreatment: req.body.fechatratamiento,
        dateendtreatment: req.body.fechafintratamiento
      }; 

      let newtreatment = {
        patient_id: req.params.id,
        tratamiento: req.body.tratamiento,
        firstname_patient: paciente.first_name,
        lastname_patient: paciente.last_name,
        datetreatment: req.body.fechatratamiento,
        dateendtreatment: req.body.fechafintratamiento
      }
      
      if (tratamiento == null) {
       
        await treatments.update(treatments_body, {where: {patient_id: req.params.id}})   
      } else {
        let newTreatment =  await treatments.create(newtreatment)
      
        let patientsid_body = {patient_id: req.params.id, treatments_id:newTreatment.id }
        
        await patienttreatments.create(patientsid_body);
      }
      res.redirect(`/patients/detail/${paciente.id}`);
      
      },
    destroy: async (req,res) => {
  
     
      const tratamiento = await treatments.findByPk(req.params.id)
      const patienttreatment = await patienttreatments.findOne({where:{treatments_id:req.params.id}})
      //return res.send(patienttreatment)
      const paciente = await patients.findOne({where:{id:tratamiento.patient_id}})
      const tratamientos = await treatments.findAll({where:{patient_id:tratamiento.patient_id}})
      //return res.send(tratamientos)
      if (tratamientos.length===1) {
          //return res.send(paciente)
       await tratamiento.destroy()
       await patienttreatment.destroy()
       //
    
       let patientsid_body1 = {patient_id: paciente.id} 
       //console.log('ooooooooooooooooooooo' + newPaciente.id);
      let newtreatment = await treatments.create(patientsid_body1);
        //return res.send(newtreatment.id)
       //Guardo en la variable los datos que quiero que se creen en la historia clinica
       let patientsid_body = {patient_id: paciente.id, treatments_id:newtreatment.id}
         //Hago el create de treatments pasandole la variable declarada acá arriba
       
         await patienttreatments.create(patientsid_body);
       res.redirect(`/patients/detail/${paciente.id}`);
      } else {
        await tratamiento.destroy()
        await patienttreatment.destroy()
        res.redirect(`/patients/detail/${paciente.id}`);
      }
     
    },
    edit: async (req,res) => {
      const paciente = await patients.findByPk(req.params.id, {include: ['medicalhistories','treatments']})
      const tratamiento = await treatments.findAll({where: {patient_id: req.params.id}})
    
      res.render(path.resolve(__dirname , '..','views','patients','patientsEdit') , {paciente,tratamiento});                       
      
    },
    updatePatients: async (req,res) => {
    const paciente = await patients.findByPk(req.params.id, {include: ['medicalhistories','treatments']})
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render(path.resolve(__dirname , '..','views','patients','patientsEdit'), {paciente,
        errors: errors.errors,  old: req.body
      });
    }
      
      const patient_body = { 
        //return res.send(_body);
        first_name: req.body.nombre,
        last_name : req.body.apellido,
        firstlast_name :req.body.nombre+" "+req.body.apellido,
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
        date_end_diabetes: req.body.fecha_end_diabetes,
        action_diabetes: req.body.accion_diabetes,
        coments_diabetes: req.body.comentario_diabetes,    
        dlp: req.body.dlp,
        date_dlp: req.body.fecha_dlp,
        date_end_dlp: req.body.fecha_end_dlp,
        action_dlp: req.body.accion_dlp,
        coments_dlp: req.body.comentario_dlp,  
        hta: req.body.hta,
        date_hta: req.body.fecha_hta,
        date_end_hta: req.body.fecha_end_hta,
        action_hta: req.body.accion_hta,
        coments_hta: req.body.comentario_hta,  
        crm: req.body.crm,
        date_crm: req.body.fecha_crm,
        date_end_crm: req.body.fecha_end_crm,
        action_crm: req.body.accion_crm,
        coments_crm: req.body.comentario_crm,  
        atc: req.body.atc,
        date_atc: req.body.fecha_atc,
        date_end_atc: req.body.fecha_end_atc,
        action_atc: req.body.accion_atc,
        coments_atc: req.body.comentario_atc, 
        iam: req.body.iam,
        date_iam: req.body.fecha_iam,
        date_end_iam: req.body.fecha_end_iam,
        action_iam: req.body.accion_iam,
        coments_iam: req.body.comentario_iam, 
        acv: req.body.acv,
        date_acv: req.body.fecha_acv,
        date_end_acv: req.body.fecha_end_acv,
        action_acv: req.body.accion_acv,
        coments_acv: req.body.comentario_acv, 
        aortic_aneurysm: req.body.aneurisma,
        date_aerotic: req.body.fecha_aneurisma,
        date_end_aerotic: req.body.fecha_end_aneurisma,
        action_aerotic: req.body.accion_aneurisma,
        coments_aerotic: req.body.comentario_aneurisma, 
        ic: req.body.ic,
        date_ic: req.body.fecha_ic,
        date_end_ic: req.body.fecha_end_ic,
        action_ic: req.body.accion_ic,
        coments_ic: req.body.comentario_ic, 
        evp: req.body.evp,
        date_evp: req.body.fecha_evp,
        date_end_evp: req.body.fecha_end_evp,
        action_evp: req.body.accion_evp,
        coments_evp: req.body.comentario_evp, 
        epoc: req.body.epoc,
        date_epoc: req.body.fecha_epoc,
        date_end_epoc: req.body.fecha_end_epoc,
        action_epoc: req.body.accion_epoc,
        coments_epoc: req.body.comentario_epoc, 
        irc: req.body.irc,
        date_irc: req.body.fecha_irc,
        date_end_irc: req.body.fecha_end_irc,
        action_irc: req.body.accion_irc,
        coments_irc: req.body.comentario_irc, 
        obesity: req.body.obesity,
        date_obesity: req.body.fecha_obesidad,
        date_end_obesity: req.body.fecha_end_obesidad,
        action_obesity: req.body.accion_obesidad,
        coments_obesity: req.body.comentario_obesidad, 
      
      };   

        let newPaciente = await patients.update(patient_body, {where: {id: req.params.id}})
      .then((patientcreate) => {
        return res.redirect('/patients');
      })  
      .catch(errors => res.render(path.resolve(__dirname , '..','views','patients','patientsEdit'), {
        errors: errors.errors,  old: req.body}))  
    
        return res.redirect('/patientsDetail');
      
    

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
    
      diabetes: async (req, res) => {
        let paciente = await patients.findAll({where: {diabetes: 'si'}})
        //return res.send(zapatillas)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },
      dlp: async (req, res) => {
        let paciente = await patients.findAll({where: {dlp: 'si'}})
        //return res.send(zapatillas)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },
      hta: async (req, res) => {
        let paciente = await patients.findAll({where: {hta: 'si'}})
        //return res.send(zapatillas)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },
      crm: async (req, res) => {
        let paciente = await patients.findAll({where: {crm: 'si'}})
        //return res.send(zapatillas)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },
      atc: async (req, res) => {
        let paciente = await patients.findAll({where: {atc: 'si'}})
        //return res.send(zapatillas)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },
      iam: async (req, res) => {
        let paciente = await patients.findAll({where: {iam: 'si'}})
        //return res.send(zapatillas)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },
      acv: async (req, res) => {
        let paciente = await patients.findAll({where: {acv: 'si'}})
        //return res.send(zapatillas)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },
      aneurisma: async (req, res) => {
        let paciente = await patients.findAll({where: {aortic_aneurysm: 'si'}})
        //return res.send(zapatillas)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },
      ic: async (req, res) => {
        let paciente = await patients.findAll({where: {ic: 'si'}})
        //return res.send(zapatillas)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },

      evp: async (req, res) => {
        let paciente = await patients.findAll({where: {evp: 'si'}})
        //return res.send(zapatillas)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },
      epoc: async (req, res) => {
        let paciente = await patients.findAll({where: {epoc: 'si'}})
        //return res.send(zapatillas)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },
      irc: async (req, res) => {
        let paciente = await patients.findAll({where: {irc: 'si'}})
        //return res.send(zapatillas)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },
      obesos: async (req, res) => {
        let paciente = await patients.findAll({where: {obesity: 'si'}})
        //return res.send(zapatillas)
        res.render(path.resolve(__dirname , '..','views','patients','patients') , {paciente});
      },
      search:async (req,res)=>{
        
        let paciente = await patients.findAll({
          where:{
            [Op.or]: [
            {$firstlast_name$: {[Op.like]: `%${req.body.search}%`}},  
            {$first_name$: {[Op.like]: `%${req.body.search}%`}},
            {$last_name$: {[Op.like]: `%${req.body.search}%`}},
            {$dni$: {[Op.like]: `%${req.body.search}%`}},
            {$nhc$: {[Op.like]: `%${req.body.search}%`}}
          ]
          }
          
        })
        //return res.send(paciente)
        .then(paciente => res.render(path.resolve(__dirname, '..', 'views', 'patients', 'resultados'), {paciente}))
        .catch((error)=> res.send(error))
      },
      inteligent: async (req,res) => {
        const paciente = await patients.findAll();
        const tratamientos = await treatments.findAll();
        res.render(path.resolve(__dirname , '..','views','patients','inteligent') , {paciente, tratamientos});                       
        
      },
      inteligentSearch: async (req,res)=>{
   


 let paciente = await patients.findAll({
  where:{
    [Op.and]:
     [{first_name: {[Op.like]: `%${req.body.nombre}%`}},
     {last_name: {[Op.like]: `%${req.body.apellido}%`}},
     {medical_insurance: {[Op.like]: `%${req.body.obraSocial}%`}},
     {gender: {[Op.like]: `%${req.body.genero}%`}},
     {diabetes: {[Op.like]: `%${req.body.diabetes}%`}},
     {dlp: {[Op.like]: `%${req.body.dlp}%`}},
     {hta: {[Op.like]: `%${req.body.hta}%`}},
     {crm: {[Op.like]: `%${req.body.crm}%`}},
     {atc: {[Op.like]: `%${req.body.atc}%`}},
     {iam: {[Op.like]: `%${req.body.iam}%`}},
     {acv: {[Op.like]: `%${req.body.acv}%`}},
     {aortic_aneurysm: {[Op.like]: `%${req.body.aneurisma}%`}},
     {ic: {[Op.like]: `%${req.body.ic}%`}},
     {evp: {[Op.like]: `%${req.body.evp}%`}},
     {epoc: {[Op.like]: `%${req.body.epoc}%`}},
     {irc: {[Op.like]: `%${req.body.irc}%`}}, 
     {obesity: {[Op.like]: `%${req.body.obesidad}%`}}, 

    ]
  }

})
      console.log('oooooooooooooooooooooooooooooooooo' + paciente);
   //return res.send(req.body)  
     
      
      
      res.render(path.resolve(__dirname, '..', 'views', 'patients', 'resultados'), {paciente})
      
  
    },
    searchtreat:async (req,res)=>{

      const tratamiento = await treatments.findAll({ 
        where:{
          [Op.or]:
           [{patient_name: {[Op.like]: `%${req.body.search}%`}},
          
           {tratamiento: {[Op.like]: `%${req.body.search}%`}}
      
          ]
        }
      
      })
  
  
      
      //return res.send(tratamiento)
      res.render(path.resolve(__dirname, '..', 'views', 'patients', 'treatments'), {tratamiento})
    },
    searchtreatments:async (req,res)=>{

      const tratamiento = await treatments.findAll({ 
        where: { 
            tratamiento: { 
              [Op.ne]: '%null%' 
            } 
        },  order: [['datetreatment', 'DESC']]
    })
  
  
      
      //return res.send(tratamiento)
      res.render(path.resolve(__dirname, '..', 'views', 'patients', 'treatments'), {tratamiento})
    },
    searchdatetreat:async (req,res)=>{

      const tratamiento = await treatments.findAll({ 
        where:{
          [Op.or]:
           [{datetreatment: {[Op.like]: `%${req.body.search}%`}},
          
      
          ]
        }
      
      })
  
  
      
      //return res.send(tratamiento)
      res.render(path.resolve(__dirname, '..', 'views', 'patients', 'treatments'), {tratamiento})
    },
    searchhistory:async (req,res)=>{

      const history = await medicalhistories.findAll({ 
        where: { 
            visitamedica: { 
              [Op.ne]: '%null%' 
            } 
        }, order: [['fechavisita', 'DESC']]
    })
  
  
      
      //return res.send(tratamiento)
      res.render(path.resolve(__dirname, '..', 'views', 'patients', 'medicalhistory'), {history})
    },
    searchdatehistory:async (req,res)=>{

      const history = await medicalhistories.findAll({ 
        where:{
          [Op.or]:
           [{fechavisita: {[Op.like]: `%${req.body.search}%`}},
          
      
          ]
        }
      
      })
  
  
      
      //return res.send(tratamiento)
      res.render(path.resolve(__dirname, '..', 'views', 'patients', 'medicalhistory'), {history})
    },
    searchhist:async (req,res)=>{

      const history = await medicalhistories.findAll({ 
        where:{
          [Op.or]:
           [{first_name: {[Op.like]: `%${req.body.search}%`}},
           {last_name: {[Op.like]: `%${req.body.search}%`}},
           {visitamedica: {[Op.like]: `%${req.body.search}%`}}
      
          ]
        }
      
      })
  
  
      
      //return res.send(tratamiento)
      res.render(path.resolve(__dirname, '..', 'views', 'patients', 'medicalhistory'), {history})
    },
    historiaclinica:async (req,res)=>{
      const paciente = await patients.findByPk(req.params.id, {include: ['medicalhistories','treatments']})
      const historiaClinica = await medicalhistories.findAll({where:{patient_id:req.params.id, visitamedica: { 
        [Op.ne]: '%null%' 
      } }})
      const imagenes= await images.findAll({where:{patient_id:req.params.id}})

      
      const exam = await exams.findAll({where:{patient_id:req.params.id, altura: { 
        [Op.ne]: '%null%' 
      } }})
     //return res.send(imagenes)
      res.render(path.resolve(__dirname, '..', 'views', 'patients', 'patientHistory'), {paciente,historiaClinica,exam,imagenes})
    },
    addevolution:async (req,res)=>{

      const paciente = await patients.findByPk(req.params.id, {include: ['medicalhistories','treatments','exams']})
      const exam = await exams.findOne({where:{patient_id:req.params.id}})
      //return res.sen(exams)
      const altura = exam.altura;
      let exams_body={
       
        altura: req.body.altura,
        peso: req.body.peso,
        masacorporal: req.body.masacorporal,
        frec_cardiaca: req.body.frec_cardiaca,
        tension_arterial:req.body.tension_arterial,
        frec_resp:req.body.frec_resp,
        temp_axilar: req.body. temp_axilar,
        perimetro_abs: req.body.perimetro_abs,
        tension_art_prom: req.body.tension_art_prom,
        r2: req.body.r2,
        r3: req.body.r3,
        r4: req.body.r4,
        soplos: req.body.soplos,
        fallaizq: req.body.fallaizq,
        saturacion: req.body.saturacion,
        date: req.body.date,

      }; 

      let newexams = {
        patient_id: paciente.id,
        altura: req.body.altura,
        peso: req.body.peso,
        masacorporal: req.body.masacorporal,
        frec_cardiaca: req.body.frec_cardiaca,
        tension_arterial:req.body.tension_arterial,
        frec_resp: req.body.frec_resp,
        temp_axilar: req.body.temp_axilar,
        perimetro_abs: req.body.perimetro_abs,
        tension_art_prom: req.body.tension_art_prom,
        r2: req.body.r2,
        r3: req.body.r3,
        r4: req.body.r4,
        soplos: req.body.soplos,
        fallaizq: req.body.fallaizq,
        fallader: req.body.fallader,
        saturacion: req.body.saturacion,
        date: req.body.date,
        doctor: req.body.doctor,
      }
      
      if (altura == null) {
       
        await exams.update(exams_body, {where: {patient_id: req.params.id}})
      } else {
        await exams.create(newexams)
      }  
     //return res.send(newmedicalhistory) 
      //return res.send(paciente)
      //res.render(path.resolve(__dirname , '..','views','patients','patientDetail') , {paciente, historiaClinica}); 
      res.redirect(`/patientsHistory/${paciente.id}`)
    },
    addimage:async (req,res)=>{
     console.log(req.file)
      const historiaClinica = await medicalhistories.findAll({where:{patient_id:req.params.id, visitamedica: { 
        [Op.ne]: '%null%' 
      } }})
      const exam = await exams.findAll({where:{patient_id:req.params.id, altura: { 
        [Op.ne]: '%null%' 
      } }})
      const imagenes= await images.findAll({where:{patient_id:req.params.id}})
      const paciente = await patients.findByPk(req.params.id, {include: ['medicalhistories','treatments','exams']})
      const image = await images.findOne({where:{patient_id:req.params.id}})
      //return res.send(req.body.imagen)

      



      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render(path.resolve(__dirname , '..','views','patients','patientHistory'), {paciente,historiaClinica,exam,imagenes,
          errors: errors.errors,  old: req.body
        });
      }
      const imagen = image.filename;
       //return res.send(imagen)
       let newimage = {
        patient_id: paciente.id,
        filename:req.file.filename
      }
      let image_body={
       filename:req.file.filename
        
      }; 

      if (imagen == null) {
       
        await images.update(image_body, {where: {patient_id: req.params.id}})
        .then((imagecreate) => {
         
        })  
        .catch(errors =>  res.redirect(`/patientsHistory/${paciente.id}`), {
          errors: errors.errors,  old: req.body}) 
      
          return res.redirect(`/patientsHistory/${paciente.id}`)
      } else {
        await images.create(newimage)
        .then((imagecreate) => {
          return res.redirect(`/patientsHistory/${paciente.id}`)
        })  
        .catch(errors =>  res.redirect(`/patientsHistory/${paciente.id}`), {
          errors: errors.errors,  old: req.body}) 
      
          return res.redirect(`/patientsHistory/${paciente.id}`)
      }  
    },
    pdf: async (req,res) => {
      const paciente = await patients.findByPk(req.params.id, {include: ['medicalhistories','treatments']})
      const tratamiento = await treatments.findAll({where: {patient_id: req.params.id}})
      const historiaClinica = await medicalhistories.findAll({where:{patient_id:req.params.id, visitamedica: { 
        [Op.ne]: '%null%' 
      } }})
      const exam = await exams.findAll({where:{patient_id:req.params.id, altura: { 
        [Op.ne]: '%null%' 
      } }})
      res.render(path.resolve(__dirname , '..','views','patients','pdf') , {paciente,tratamiento,historiaClinica,exam});                       
      
    },
  }
  
  
  