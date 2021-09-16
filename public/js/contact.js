var form = document.querySelector('#contact-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    Swal.fire(
        'Enviado correctamente!',
        'Gracias por escribirnos, nos pondremos en contacto a brevedad!',
        'success'
    )
    let formData = new FormData(form);
    form.reset();
    fetch("contact.php",
    {
        body: formData,
        method: "post"
    });
});