const fs = require('fs');
const path = require('path');
const {patients} = require('../database/models')

const {
    check,
    validationResult,
    body
} = require('express-validator');

let archivoPatients = patients.findAll();

module.exports = [
    
    //Aquí incoporé otras validaciones, para que las tengan de guía para sus proyectos  
    check('nombre').isLength({min: 2}).withMessage('El campo nombre debe tener al menos 2 caracteres'),
    check('nombre').not().isEmpty().withMessage('El campo nombre no puede estar vacio'),
    check('apellido').isLength({min: 2}).withMessage('El campo apellido debe tener al menos 2 caracteres'),
    check('apellido').not().isEmpty().withMessage('El campo apellido no puede estar vacio'),
    check('genero').not().isEmpty().withMessage('Debe seleccionar un género'),
    body('email').custom( async (value) =>{
        let patient = await patients.findOne({
          where: {email: value}
          
        })
        
        if (patient){
          return Promise.reject('Un paciente con el mismo email ya se encuentra registrado')
        } 
        return true
      }),
    check('email').not().isEmpty().withMessage('El campo email no puede estar vacio'),
    check('dni').not().isEmpty().withMessage('El campo DNI no puede estar vacio'),
    check('dni').isLength({min: 8},{max: 8}).withMessage('El campo DNI debe tener 8 carácteres'),
    body('dni').custom( async (value) =>{
        let patient = await patients.findOne({
          where: {dni: value}
          
        })
        
        if (patient){
          return Promise.reject('Un paciente con el mismo DNI ya se encuentra registrado')
        } 
        return true
      }),
    check('dirección').not().isEmpty().withMessage('El campo dirección no puede estar vacio'),
    check('numero').not().isEmpty().withMessage('El campo numero no puede estar vacio'),
    check('telefono').not().isEmpty().withMessage('El campo teléfono no puede estar vacio'),
    check('nhc').not().isEmpty().withMessage('El campo número de no puede estar vacio'),
    body('nhc').custom( async (value) =>{
        let patient = await patients.findOne({
          where: {nhc: value}
          
        })
        
        if (patient){
          return Promise.reject('Un paciente con el mismo número de historia clínica ya se encuentra registrado')
        } 
        return true
      }),

    ]
    