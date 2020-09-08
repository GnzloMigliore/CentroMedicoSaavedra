module.exports= (req,res,next) =>{
    if(res.locals.usuario){
        return next('patients');
    }else{
        res.redirect('/login') 
    }
}