module.exports= (req,res,next) =>{
    if(res.locals.usuario.roles > 1){
        return next();
    }else{
        res.redirect('/patients') 
    }
}