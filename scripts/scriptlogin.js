
/* variables para modificar los estilos de las ventanas de los formularios login y registro */
// Botones para hacer el cambio de formulario
const loginBotonCambioVentana = document.querySelector(".ingresoBotonCambioVentana");
const registroBotonCambioVentana = document.querySelector(".registroBotonCambioVentana");

// contieneFormulario contiene los dos formularios de ingreso y de registro
const contieneFormulario = document.querySelector(".contieneFormularios");
//bodyLogin contiene toda la estructura de formularios de registro y de login
const bodyLogin = document.querySelector(".bodyLogin");

// Variables para manipular ventanas emergentes
const modalMensajeExitoso = document.getElementById("modalMensajeExitoso");
const cerrarModalExitoso = document.querySelector(".cerrar"); 

// Cuando oprima el botón de registro para cambio de ventana, activa la funcionalidad de los contenedores para hacer el cambio de formularios
registroBotonCambioVentana.onclick = function(){
    contieneFormulario.classList.add('active');
    bodyLogin.classList.add('active');
}

// Cuando oprima el botón de login para cambio de ventana, desactiva la funcionalidad de los contenedores para hacer el cambio de formularios
loginBotonCambioVentana.onclick = function(){
    contieneFormulario.classList.remove('active');
    bodyLogin.classList.remove('active');
}

// Cerrar la ventana Mensaje Exitoso cuando se haga clic en la "X"
cerrarModalExitoso.onclick = function() {
  modalMensajeExitoso.style.display = "none";
}


//Código para validación de datos de correo y contraseña
/* expresiones para validar correo y Contrasena */
const expresiones = {
  correoE: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,3}$/,
  contrasena: /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/
}

//método de escucha para cuando hay cambios en el input de correo y después de un submit activa el mensaje correspondiente
document.getElementById('correo').addEventListener('input', function(){
  const correo = document.getElementById('correo');
  let validoCorreo = expresiones.correoE.test(correo.value);
  
  if(!validoCorreo){
    mensaje.textContent = 'Correo Incompleto';
    mensaje.style.color = 'red';
    correo.setCustomValidity(
      "¡El correo que ingresaste no es valido!",
    );
  }
  else {
    correo.setCustomValidity("");
  }
});

 // limpia el mensaje al ingresar nuevamente en el campo correo
 document.getElementById('correo').addEventListener('input', function() {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = '';
});

//método de escucha para mostrar siempre el mensaje de advertencia de la clave
// creación de variables de las dos contraseñas
let contrasenaRegistro = document.getElementById('contrasenaR');
let confirmacionContrasenaRegistro = document.getElementById('validarContrasena')

function verificarContrasenaAdecuada(){
  if(expresiones.contrasena.test(contrasenaRegistro.value)){
    contrasenaRegistro.setCustomValidity('');
   }else{
    contrasenaRegistro.reportValidity(); //habilita el mensaje de advertencia
    contrasenaRegistro.setCustomValidity(
      'La contraseña debe tener al menos 6 caracteres, una mayúscula y un número.'
    );
   }
}

function verificarContrasenaIguales(){
  if(confirmacionContrasenaRegistro.value === contrasenaRegistro.value){
    confirmacionContrasenaRegistro.setCustomValidity('');
  }else{
     confirmacionContrasenaRegistro.reportValidity();
     confirmacionContrasenaRegistro.setCustomValidity(
       'Las contraseñas no coinciden.'
     );
  }
}

//método de escucha de un click sobre los input de contraseña
window.addEventListener('click', (event) =>{ 
  if(event.target.id == "contrasenaR"){verificarContrasenaAdecuada();}
  if(event.target.id == "validarContrasena"){verificarContrasenaIguales();}
})

//método de escucha sobre cambios en el input de contrasenaRegistro para verificar que cumpla la expresión
contrasenaRegistro.addEventListener('input', verificarContrasenaAdecuada)

//método de escucha sobre cambios en el input de confirmacionContrasenaRegistro para verificar que cumpla la expresión
confirmacionContrasenaRegistro.addEventListener('input',verificarContrasenaIguales)


// document.getElementById('formularioR').addEventListener('submit', function(event) {
   
//   event.preventDefault(); /* no se envía por defecto */
//   const correo = document.getElementById('correo').value; /* guardo el valor dentro de correo */
//   let validoCorreo = expresiones.correoE.test(correo); /* valido si tiene las característica de un correo */
  
//   /* si el correo es valido continua evaluando */
//   if(!validoCorreo){
//     mensaje.textContent = 'Correo Incompleto';
//     mensaje.style.color = 'red';
//   }else{

//   /* guardo los contenidos de los inputs contrasena y validarContrasena*/
//     const contrasena = contrasenaRegistro.value;
//     const validarContrasena = confirmacionContrasenaRegistro.value;
//     const mensaje = document.getElementById('mensaje');

//     /* Valido que la contrasena tenga una mayúscula y un numero y sea de al menos 6 caracteres */
//     const esValida = expresiones.contrasena.test(contrasena);
    
//     /* si mi contraseñas con iguales y tienen una mayúscula y un numero y tiene al menos 6 caracteres
//     se envía un mensaje modal dando la Bienvenida */
//     if (esValida && contrasena == validarContrasena) {
//       modalMensajeExitoso.style.display = 'block';

//     /* en caso que la contrasena no sean iguales que le diga al usuario */
//     } else if(contrasena != validarContrasena){
//       mensaje.textContent = 'No Coinciden las Contraseñas';
//       mensaje.style.color = 'red';
//     /* en caso que la contrasena no cumpla con las condiciones se le informa al usuario */
//     }else{
//       mensaje.textContent = 'La contraseña debe tener al menos 6 caracteres, una mayúscula y un número.';
//       mensaje.style.color = 'red';
//     }

//   }
// });

 // limpia el mensaje al ingresar nueva contraseña
document.getElementById('contrasenaR').addEventListener('input', function() {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = '';
});



// Código para cambiar de visualización si el usuario hace un correcto login
//ya hemos llamado al div class bodyLogin como body
let divUsuarioRegistrado = document.querySelector(".divUsuarioRegistrado");
let botonRealizarIngreso = document.querySelector("#realizarIngreso");
let botonCerrarSesion = document.querySelector("#cerrarSesion");
const formularioIngreso = document.querySelector("#formulario");
let nameUser1 =  document.getElementById('sesion');

function mostrarPerfil(){
  bodyLogin.classList.remove('mostrar');
  bodyLogin.classList.add('ocultar');
  setTimeout( function(){
      bodyLogin.style.display = 'none';
      divUsuarioRegistrado.style.display = 'block';
    },500 )
  setTimeout(function(){
      divUsuarioRegistrado.classList.remove('ocultar');
      divUsuarioRegistrado.classList.add('mostrar');
    },500)
}

function mostrarBodyLogin(){
  divUsuarioRegistrado.classList.remove('mostrar');
  divUsuarioRegistrado.classList.add('ocultar');
  setTimeout( function(){
    bodyLogin.style.display = 'flex';
    divUsuarioRegistrado.style.display = 'none';
  },500 )
  setTimeout( function(){
    bodyLogin.classList.remove('ocultar');
    bodyLogin.classList.add('mostrar');
  },500 );
}


// si existe la variable usuario y tiene contenido, mostramos la vista de perfil y ocultamos la de formularios de registro o ingreso
if(localStorage.getItem('usuario') != undefined){
  if( localStorage.getItem('usuario').length != 0 ){
    mostrarPerfil();
  }
}

//Cuando oprime en ingresar, verifica el usuario y la contraseña, si son correctas muestra el div de perfil y oculta el de formularios de ingreso
botonRealizarIngreso.onclick = function(event) {
  event.preventDefault();
  if(formularioIngreso.usuario.value === "admin" && formularioIngreso.contrasena.value === "1234" ){
    localStorage.setItem( 'usuario', 'admin');
    mostrarPerfil();
    nameUser1.innerText = localStorage.getItem('usuario');
  }
}

//Cuando cierra sesión muestra los formularios y oculta el perfil
botonCerrarSesion.onclick = function() {
  mostrarBodyLogin();
  nameUser1.innerText = "Ingresar";
  localStorage.setItem( 'usuario', '');

}

