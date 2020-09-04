const fs = require('fs');
const path = require('path');
//let archivoUsuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')));       
const {users} = require ('../database/models');
const usuario = require('../database/models/usuario');

module.exports = (req, res, next) => {
    res.locals.usuario = false;

    if(req.session.usuario){
        res.locals.usuario = req.session.usuario;
        return next();
    }else if(req.cookies.email){
        users.findOne({
            where: {
               email: req.cookies.email
            }
        })
        .then(user =>{
            req.session.usuario = usuario;
            res.locals.usuario = usuario;
            
            return next();
    
        })
    } else {
        return next();
    }
}
