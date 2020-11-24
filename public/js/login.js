window.addEventListener('load', () => {
    
    let formulario =document.getElementById('formulario');
    
    formulario.addEventListener('submit', function(evento) {
        
        if(!validaciones(evento)){
            evento.preventDefault();
        }else{
            formulario.submit();
        } 
        
        function validaciones(evento){
            let {email, contraseña } = formulario.elements;
            let errores = [];
            console.log(formulario.elements.email.value);

            let reEmail  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(!reEmail.test(email.value) || email.value == ''){
                errores.push('El email es inválido...');
                email.classList.add('is-invalid'); 
                email.classList.remove('is-valid');  
            }else{
                email.classList.add('is-valid');
                email.classList.remove('is-invalid');
            }
            
            let rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            if(!rePassword.test(contraseña.value) || contraseña.value == ''){
                errores.push('La contraseña es incorrecta...');
                contraseña.classList.add('is-invalid'); 
                contraseña.classList.remove('is-valid'); 
                email.classList.add('is-invalid');
                email.classList.remove('is-valid');  
            }else{
                contraseña.classList.add('is-valid');
                contraseña.classList.remove('is-invalid');
            }
            
            //Acá enviamos los errores al usuario
            let ulErrores = document.getElementById('errores');
            ulErrores.classList.add('alert-danger')
            if(errores.length > 0){
                
                evento.preventDefault();
                ulErrores.innerHTML = "";
                for (let i = 0 ; i < errores.length; i++){
                    ulErrores.innerHTML += `<li> ${errores[i]} </li> `
                }
                errores = [];
            }else{
                return true;
            }
        }
    })
    
})