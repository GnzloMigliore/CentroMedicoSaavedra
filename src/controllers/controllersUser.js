
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {users} = require ('../database/models');
const {
  check,
  validationResult,
  body
} = require('express-validator');

module.exports = {
  registro: async (req, res) => {
    const usuarios = await users.findAll()
    res.render(path.resolve(__dirname , '..','views','web','registro'),{usuarios}); 
},
  create: async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render(path.resolve(__dirname , '..','views','web','registro'), {
            errors: errors.errors,  old: req.body
        });
      }
    let usuario={
        first_name: req.body.nombre,
        last_name : req.body.apellido,
        username : req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.contraseña, 10),      
        telephone: req.body.telefono,
        gender: req.body.genero,    
        roles: 1   
    };    
    users.create(usuario)
    .then((usuarioRegistrado) => {
        return res.redirect('/');
    })  
    .catch(error => res.render(path.resolve(__dirname , '..','views','web','registro'), {
      errors: errors.errors,  old: req.body}))     
},
 login: async (req, res) => {
        
  let errors = validationResult(req);
  if(!errors.isEmpty()){
      //return res.send(errors.mapped())
      return res.render(path.resolve(__dirname, '..', 'views', 'usuarios', 'login'), {
          errors: errors.mapped(),  old: req.body});
  } else {
      let usuarioLogueado = await users.findOne({where: {email: req.body.email}})
      delete usuarioLogueado.password;
      req.session.usuario = usuarioLogueado;
      //return res.send (req.session.usuario)
      if(req.body.recordarme){
          res.cookie('email', usuarioLogueado.email, {maxAge: 1000 * 60 * 60 * 48})
      }
      res.redirect('/patients');
  }
  
  
  
},
logout: (req, res) => {
  req.session.destroy();
  res.cookie('email',null,{maxAge: -1});
  res.redirect('/')
},

}