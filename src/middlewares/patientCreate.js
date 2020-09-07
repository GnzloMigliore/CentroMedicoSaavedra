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
    check('nombre').isLength({min: 2}).withMessage('El campo nombre debe tener al menos 4 caracteres'),
    check('nombre').not().isEmpty().withMessage('El campo nombre no puede estar vacio'),
    check('apellido').isLength({min: 2}).withMessage('El campo apellido debe tener al menos 2 caracteres'),
    check('apellido').not().isEmpty().withMessage('El campo apellido no puede estar vacio'),
  

    
    
  

    ]
    