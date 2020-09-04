module.exports= (req,res,next) =>{
    if(res.locals.usuario){
        return next();
    }else{
        res.redirect('/login') 
    }
}