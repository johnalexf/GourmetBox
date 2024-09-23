
/* variables para modificar los estilos y acceder a los datos */
const loginBtn = document.querySelector(".ingresoBoton");
const registroBtn = document.querySelector(".registroBoton");

const contieneFormulario = document.querySelector(".contieneFormularios");
const body = document.querySelector(".bodyLogin");

// Variables para manipular ventanas emergentes
const modalMensajeExitoso = document.getElementById("modalMensajeExitoso");
const cerrarModalExitoso = document.getElementsByClassName("cerrar")[0]; //Esta instrucción se parece a document.querySelectorAll

registroBtn.onclick = function(){
    contieneFormulario.classList.add('active');
    body.classList.add('active');
}

loginBtn.onclick = function(){
    contieneFormulario.classList.remove('active');
    body.classList.remove('active');
}

// Cerrar la ventana Mensaje Exitoso cuando se haga clic en la "X"
cerrarModalExitoso.onclick = function() {
  modalMensajeExitoso.style.display = "none";
}

/* mis expresiones para validar correo y contrasena */
const expresiones = {
  correoE: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,3}$/,
  contrasena: /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/
}

document.getElementById('correo').addEventListener('input', function(){
  const correo = document.getElementById('correo').value;

  let validoCorreo = expresiones.correoE.test(correo);
  
  if(!validoCorreo){
    mensaje.textContent = 'Correo Incompleto';
    mensaje.style.color = 'red';
  }
});

 // limpia el mensaje al ingresar nuevamente en el campo correo
 document.getElementById('correo').addEventListener('input', function() {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = '';
});


document.getElementById('formularioR').addEventListener('submit', function(event) {
   /* no se envia por defecto */
  event.preventDefault();

  /* guardo el valor dentro de correo */
  const correo = document.getElementById('correo').value;
  /* valido si tiene las caracteristica de un correo */
  let validoCorreo = expresiones.correoE.test(correo);
  
  /* si el correo es valido cotinua evaluando */
  if(!validoCorreo){
    mensaje.textContent = 'Correo Incompleto';
    mensaje.style.color = 'red';
  }else{

  /* guardo los contenidos de los inputs contrasena y validarContrasena*/
    const contrasena = document.getElementById('contrasenaR').value;
    const validarContrasena = document.getElementById('validarContrasena').value;
    const mensaje = document.getElementById('mensaje');

    /* Valido que la contrasena tenga una mayuscula y un numero y sea de almenos 6 caracteres */
    const esValida = expresiones.contrasena.test(contrasena);
    
    /* si mi contrasenas con iguales y tienen una mayuscula y un numero y tiene almenos 6 caracteres
    se envia un mensaje modal dando la Bienvenida */
    if (esValida && contrasena == validarContrasena) {
      modalMensajeExitoso.style.display = 'block';

    /* en caso que la contrasena no sean iguales que le diga al usuario */
    } else if(contrasena != validarContrasena){
      mensaje.textContent = 'No Coinciden las Contrasenas';
      mensaje.style.color = 'red';
    /* en caso que la contrasena no cumpla con las condiciones se le informa al usuario */
    }else{
      mensaje.textContent = 'La contraseña debe tener al menos 6 caracteres, una mayúscula y un número.';
      mensaje.style.color = 'red';
    }

  }
});

 // limpia el mensaje al ingresar nueva contraseña
document.getElementById('contrasenaR').addEventListener('input', function() {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = '';
});

