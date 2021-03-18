const fs = require('fs');
const path = require('path');
const {users} = require('../database/models')
const {
  check,
  validationResult,
  body
} = require('express-validator');



module.exports = [
    
    //Aquí incoporé otras validaciones, para que las tengan de guía para sus proyectos  
    check('nombre').not().isEmpty().withMessage('El campo nombre no puede estar vacio'),
    check('nombre').isLength({min: 2}).withMessage('El campo nombre debe tener al menos 2 caracteres'),
    check('apellido').not().isEmpty().withMessage('El campo apellido no puede estar vacio'),
    check('apellido').isLength({min: 2}).withMessage('El campo apellido debe tener al menos 2 caracteres'),
    check('email').not().isEmpty().withMessage('El campo email no puede estar vacio'),
    check('email').isEmail().withMessage('Agregar un email válido'),
    check('genero').not().isEmpty().withMessage('Debe elegir su género'),
        
      
]