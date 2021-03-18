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
    body('email').custom( async (value) =>{
      let user = await users.findOne({
        where: {email: value}
        
      })
      
      if (user){
        return Promise.reject('El usuario ya se encuentra registrado')
      } 
      return true
    }),
        check('contraseña').not().isEmpty().withMessage('El campo contraseña no puede estar vacio'),
        check('contraseña').isLength({min: 8 }).withMessage('La contraseña debe tener un mínimo de 8 caractéres'),
       
        check('genero').not().isEmpty().withMessage('Debe elegir su género'),
        
        //Aquí valido la confimación del password dispuesto por el usuario
        check('confirmar_contraseña').not().isEmpty().withMessage('El campo repetir contraseña no puede estar vacio'),
        check('confirmar_contraseña').isLength({min: 8 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 8 caractéres'),
      
        body('confirmar_contraseña').custom((value, {req}) =>{
          if(req.body.contraseña == value ){
            return true    // Si yo retorno un true  no se muestra el error     
          }else{
            return false   // Si retorno un false si se muestra el error
          }    
        }).withMessage('Las contraseñas deben ser iguales'),
        
]