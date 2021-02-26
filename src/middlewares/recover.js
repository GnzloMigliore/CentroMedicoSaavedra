const {users} = require('../database/models');
let archivoUsuarios = users.findAll();
const {
    check,
    validationResult,
    body
  } = require('express-validator');
  module.exports = [
    check('email').not().isEmpty().withMessage('El campo email no puede estar vacío'),
    check('email').isEmail().withMessage('Ingrese un mail válido.'),
    body('email').custom( async (value) =>{
        let user = await users.findOne({
          where: {email: value}
          
        })
        
        if (user === null){
          return Promise.reject('El usuario no se encuentra registrado')
        } 
        return true
      }),
]