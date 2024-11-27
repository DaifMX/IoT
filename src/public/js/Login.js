import RequestService from "./service/RequestService.js";

const req = new RequestService();

// FORM de Login
const form_object = document.getElementById('login-form');
const modalSpinner = document.getElementById('modal-spinner'); // Obtener el modal

// Redireccionar si esta logeado 
try {
    const isLoggedIn = await req.post('/auth/verify', {});
    if(isLoggedIn.data.status==='success') window.location.href = '/';
    
} catch (err){}

// Evento -> CLick en boton de iniciar sesión
form_object.addEventListener('submit', async function (e){
    e.preventDefault();

    // Campos del formulario
    const email_value = form_object.email.value; 
    const password_value = form_object.password.value;

    console.log(email_value, password_value);
    // Verificar que no esten vacios
    if(email_value && password_value) {
        try {
            const response = await req.post('/auth/login', {
                email: email_value, 
                password: password_value
            });
            
            modalSpinner.style.display = 'none'; // Ocultar spinner después de recibir la respuesta
            if(response.data.status === 'success') window.location.href = '/';

        } catch (err) {
            console.log(err);
            modalSpinner.style.display = 'none';
            Swal.fire({
                title: "Error",
                text: err.response.data.error,
                icon: "error",
                heightAuto: false,
                confirmButtonColor: "#007BFF",
            });
        }

    } else {
        modalSpinner.style.display = 'none';
        Swal.fire({
            title: "Error",
            text: "Campos incompletos.",
            icon: "error",
            heightAuto: false,
            confirmButtonColor: "#007BFF",
        });
    }
});