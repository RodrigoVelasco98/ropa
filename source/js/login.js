// login.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    const credentials = {
        usuario: usuario,
        password: password
    };

    fetch('https://8xg749st-3000.usw3.devtunnels.ms/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Login exitoso', data);
            // Redirigir a la página de inicio u otra página
            window.location.href = 'agregar.html';
        } else {
            console.error('Error en el login', data.message);
            alert('Usuario o contrasena incorrecto');
        }
    })
    .catch(error => console.error('Error:', error));
});
