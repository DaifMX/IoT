import RequestService from "./service/RequestService.js";

// FORM de Login
const form_object = document.getElementById('form-login');

// Evento -> CLick en boton de iniciar sesión
form_object.addEventListener('submit', async function (e){
    e.preventDefault();

    // Campos del formulario
    const email_value = form_object.email.value; 
    const password_value = form_object.password.value;

    // Verificar que no esten vacios
    if(email_value && password_value) {
        const req = new RequestService(false);

        try {
            const response = await req.post('/auth/login', {
                email: email_value, 
                password: password_value
            });

            if(response.data.status === 'success') {
                console.log('Success');
        
            } else { 
                console.error('Cant send', response.data.message);
            }

        } catch (err) {
            console.error('Unexpected error', err);
        }
    }
});