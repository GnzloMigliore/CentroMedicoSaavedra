
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
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
        puesto: req.body.puesto,  
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
  if (!errors.isEmpty()){
      return res.render(path.resolve(__dirname, '..', 'views', 'web', 'index'), {
          errors: errors.mapped(),  old: req.body});
  } else{
    
      let usuarioLogueado = await users.findOne({
          where: {
              email: req.body.email
             }
      })
      
      delete usuarioLogueado.password;
      req.session.usuario = usuarioLogueado;
      //return res.send(req.session.usuario)
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
recover : async  (req,res) => {
  const usuarios = await users.findAll()
 
  res.render(path.resolve(__dirname, '..', 'views', 'web', 'recover') , {usuarios});
},
sendemail : async  (req,res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()){
      return res.render(path.resolve(__dirname, '..', 'views', 'web', 'recover'), {
          errors: errors.mapped(),  old: req.body});
  } else{
   return res.send(req.body)
    return res.render(path.resolve(__dirname, '..', 'views', 'web', 'index'))
      
      }
},
newpassword : async  (req,res) => {
  const usuarios = await users.findOne({
    where: {
        id: req.params.id
       }
})
  return res.render(path.resolve(__dirname, '..', 'views', 'web', 'newpassword'),{usuarios})
},
updatepassword : async  (req,res) => {
   const usuarios = await users.findOne({
    where: {
        id: req.params.id
       }
})
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.render(path.resolve(__dirname , '..','views','web','newpassword'), {
        usuarios, errors: errors.errors,  old: req.body
      });
    }
 
  const usuario_body = { 
    //return res.send(_body);
   
    
    password: bcrypt.hashSync(req.body.contraseña, 10),
    
}
users.update(usuario_body, {where: {id: req.params.id}})
.then((usuario) => {
    return res.redirect('/');
})  
.catch(error => res.render(path.resolve(__dirname , '..','views','web','newpassword'), {usuarios,
  errors: errors.errors,  old: req.body}))     



  
},
sendemail: async  (req,res) => {
  let user = await users.findOne({
    where: {
        email: req.body.email
       }
});

  if (user) {
    const userId = user.id;
    const email = req.body.email
contentHTML = `
<h1>Recover password <h1> 
http://localhost:3000/newpassword
`; 
const transporter = nodemailer.createTransport({
  host:'sistemcms.com',
  port:  25,
  secure:false,
  auth:{
    user:"Gonzalomigliore@sistemcms.com",
    pass:'Yavu1234_'


  },
  tls:{
    rejectUnauthorized:false
  }
});
await transporter.sendMail({
  from: "'Centro Médico Saavedra'<Gonzalomigliore@sistemcms.com>",
  to:email,
  subject: "Cambio de contraseña",
  text: "Para un cambio de contraseña has click aquí: http://sistemcms.com/newpassword/"+userId
})
res.redirect('/mensajeenviado');
  }
else{
  res.redirect('/usernotfound')
  }


},
usernotfound: async  (req,res) => {
  return res.render(path.resolve(__dirname, '..', 'views', 'web', 'usernotfound'))
},
mensajeenviado: async  (req,res) => {
  return res.render(path.resolve(__dirname, '..', 'views', 'web', 'mensajeenviado'))
},
show: async (req, res) => {
  const usuarios = await users.findAll()

  res.render(path.resolve(__dirname , '..','views','users','profile') , {usuarios}); 
},
profile: async (req, res) => {
  const usuarios = await users.findByPk(req.params.id)
  //return res.send(usuarios); 
  res.render(path.resolve(__dirname , '..','views','users','profileEdit') , {usuarios});
},
update: async (req,res) =>{

  const usuario_body = { 
      //return res.send(_body);
      first_name: req.body.nombre,
      last_name: req.body.apellido,
      telephone: req.body.telefono,
      email: req.body.email,
      gender: req.body.gender,
      
  }
  await users.update(usuario_body, {where: {id: req.params.id}})


  res.render(path.resolve(__dirname , '..','views','web','index'));
},
destroy: async (req, res) => {
  await users.destroy({where: {id:req.params.id}, force: true})
  req.session.destroy();
  res.cookie('email',null,{maxAge: -1});        
  res.redirect('/')
}
}