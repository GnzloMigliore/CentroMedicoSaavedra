
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const {users} = require ('../database/models');

module.exports = {
  registro: async (req, res) => {
    const usuarios = await usuarios.findAll()
    res.render(path.resolve(__dirname , '..','views','web','registro'),{usuarios}); 
},
  create: async (req, res) => {
    const usuarios = await users.findAll()
    let usuario={
        first_name: req.body.nombre,
        last_name : req.body.apellido,
        username : req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.contraseña, 10),      
        telephone: req.body.telefono,
        gender: req.body.genero,    
        role: 1   
    };
    
    users.create(usuario)
    .then((usuarioRegistrado) => {
        return res.redirect('/');
    })



      
},

}