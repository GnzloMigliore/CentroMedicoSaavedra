module.exports= (req,res,next) =>{
    if(req.session.usuario){
        return next();
    }else{
        res.redirect('/') 
    }
}