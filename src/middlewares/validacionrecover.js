const fs = require('fs');
const path = require('path');
const {users} = require('../database/models')
const {
  check,
  validationResult,
  body
} = require('express-validator');


module.exports = [


//Aquí valido la confimación del password dispuesto por el usuario
check('contraseña').not().isEmpty().withMessage('El campo contraseña no puede estar vacio'),
check('contraseña').isLength({min: 8 }).withMessage('La contraseña debe tener un mínimo de 8 caractéres'),
check('confirmar_contraseña').not().isEmpty().withMessage('El campo repetir contraseña no puede estar vacio'),
check('confirmar_contraseña').isLength({min: 8 }).withMessage('El campo repetir contraseña debe tener un mínimo de 8 caractéres'),

body('confirmar_contraseña').custom((value, {req}) =>{
  if(req.body.contraseña == value ){
    return true    // Si yo retorno un true  no se muestra el error     
  }else{
    return false   // Si retorno un false si se muestra el error
  }    
}).withMessage('Las contraseñas deben ser iguales'),



            
]