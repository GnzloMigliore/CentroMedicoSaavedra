
const path = require('path');
const fs = require('fs');
const { Op } = require("sequelize");
const {patients, medicalhistories} = require ('../database/models');

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
    //Guardo el paciente creado en una variable para despues poder llamarlo cuando creo la historia clinica
    let newPaciente = await patients.create(patient_body)
    //console.log('ooooooooooooooooooooo' + newPaciente.id);
    //Guardo en la variable los datos que quiero que se creen en la historia clinica
    let medicalhistories_body = {patient_id: newPaciente.id}
    //Hago el create de la historia clinica pasandole la variable declarada acá arriba
    await medicalhistories.create(medicalhistories_body);

    res.redirect('/patients')
    },
    show: async (req,res)=>{
      const paciente = await patients.findByPk(req.params.id)
      const historiaClinica = await medicalhistories.findAll({where: {patient_id: req.params.id}, order: [['createdAt', 'DESC']]})
      //return res.send(historiaClinica)
      
      res.render(path.resolve(__dirname , '..','views','patients','patientDetail') , {paciente, historiaClinica});   
    },
    addhistory: async (req,res)=>{
      
      const paciente = await patients.findByPk(req.params.id, {include: ['medicalhistories']})
      const historiaClinica = await medicalhistories.findOne({where:{patient_id:req.params.id}})
      
      const visita = historiaClinica.visitamedica
      
      let medicalhistory_body={
        visitamedica: req.body.visita_medica
      }; 

      let newMedicalHistory = {
        patient_id: paciente.id,
        visitamedica: req.body.visita_medica
      }
      
      if (visita.length >= 1) {
        await medicalhistories.create(newMedicalHistory)
      } else {
        await medicalhistories.update(medicalhistory_body, {where: {patient_id: req.params.id}})
      }
      
      //return res.send(newmedicalhistory)
      
      
      
      //return res.send(paciente)
      //res.render(path.resolve(__dirname , '..','views','patients','patientDetail') , {paciente, historiaClinica}); 
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
        //dni: req.body.dni,
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
  
  
  