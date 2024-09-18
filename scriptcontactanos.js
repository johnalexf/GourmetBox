// script.js
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de forma automática
  
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mensaje = document.getElementById('mensaje');
  
    // Validación simple
    if (nombre === '' || email === '' || password === '') {
      mensaje.textContent = 'Por favor, completa todos los campos.';
      return;
    }
  
    // Aquí puedes agregar más validaciones o manejar los datos como desees
    mensaje.textContent = 'Formulario enviado correctamente.';
    mensaje.style.color = 'green';
    
    // Limpiar el formulario
    document.getElementById('formulario').reset();
  });
  