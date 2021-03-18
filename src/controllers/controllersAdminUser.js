
const path = require('path');
const fs = require('fs');
const {users} = require ('../database/models');
const bcrypt = require('bcryptjs');
const {
  check,
  validationResult,
  body
} = require('express-validator');

module.exports = {
  index : async  (req,res) => {
    const usuarios = await users.findAll()
    res.render(path.resolve(__dirname, '..', 'views', 'users', 'adminusers'),{usuarios});
  },
  registro: async (req, res) => {
    const usuarios = await users.findAll()
    res.render(path.resolve(__dirname , '..','views','users','registro'),{usuarios}); 
},
  create: async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render(path.resolve(__dirname , '..','views','users','registro'), {
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
        puesto: req.body.puesto,  
        gender: req.body.genero,    
        roles: 1   
    };    
    users.create(usuario)
    .then((usuarioRegistrado) => {
        return res.redirect('/adminUsers');
    })  
    .catch(error => res.render(path.resolve(__dirname , '..','views','users','registro'), {
      errors: errors.errors,  old: req.body}))     
},
editar: async (req, res) => {
  const usuario = await users.findByPk(req.params.id)
  res.render(path.resolve(__dirname , '..','views','users','editUser'),{usuario}); 
},
update: async (req, res) => {
   const usuario = await users.findByPk(req.params.id)
  let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render(path.resolve(__dirname , '..','views','users','editUser'),{usuario,
            errors: errors.errors,  old: req.body
        });
      }
  let usuario_body={
    first_name: req.body.nombre,
    last_name : req.body.apellido,
    username : req.body.username,
    email: req.body.email,     
    telephone: req.body.telefono,
    puesto: req.body.puesto,  
    gender: req.body.genero,    
    roles: req.body.roles   
};    
//return res.send(req.params.id)
let newUser = await users.update(usuario_body, {where: {id: req.params.id}})
.then((usercreate) => {
  return res.redirect('/adminusers');
})  
.catch(errors => res.render(path.resolve(__dirname , '..','views','users','editUsers'), {
  errors: errors.errors,  old: req.body}))  
  return res.redirect("/adminusers");
},

delete: async (req, res) => {
  const usuario = await users.findByPk(req.params.id);
  await usuario.destroy();
  res.redirect("/adminusers");
},

}
