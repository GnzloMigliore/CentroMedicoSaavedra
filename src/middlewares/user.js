const db = require('../database/models');
const User = db.User;

module.exports = (req,res,next) => {

    res.locals.usuario = false;   
    if(req.session.usuario){
        res.locals.usuario = req.session.usuario;
        return next();
    } else if(req.cookies.email){
        User.findOne({where:{email:req.cookies.email}})
            .then(user => {
            let userLogueado = user;
            delete userLogueado.password;            
            req.session.usuario = userLogueado;
            res.locals.usuario = userLogueado;
            return next();
            })
            .catch(error => res.send(error));
    }
    setTimeout(()=>next(),10);
};