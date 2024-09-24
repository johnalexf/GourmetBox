
/* variables para modificar los estilos de las ventanas de los formularios login y registro */
// Botones para hacer el cambio de formulario
const loginBotonCambioVentana = document.querySelector(".ingresoBotonCambioVentana");
const registroBotonCambioVentana = document.querySelector(".registroBotonCambioVentana");

// contieneFormulario contiene los dos formularios de ingreso y de registro
const contieneFormulario = document.querySelector(".contieneFormularios");
//bodylogin contiene toda la estructura de formularios de registro y de login
const bodyLogin = document.querySelector(".bodyLogin");

// Variables para manipular ventanas emergentes
const modalMensajeExitoso = document.getElementById("modalMensajeExitoso");
const cerrarModalExitoso = document.querySelector(".cerrar"); 

// Cuando oprima el boton de registro para cambio de ventana, activa la funcionalidad de los contenedores para hacer el cambio de formularios
registroBotonCambioVentana.onclick = function(){
    contieneFormulario.classList.add('active');
    bodyLogin.classList.add('active');
}

// Cuando oprima el boton de login para cambio de ventana, desactiva la funcionalidad de los contenedores para hacer el cambio de formularios
loginBotonCambioVentana.onclick = function(){
    contieneFormulario.classList.remove('active');
    bodyLogin.classList.remove('active');
}

// Cerrar la ventana Mensaje Exitoso cuando se haga clic en la "X"
cerrarModalExitoso.onclick = function() {
  modalMensajeExitoso.style.display = "none";
}


//Codigo para validacion de datos de correo y contraseña
/* expresiones para validar correo y contrasena */
const expresiones = {
  correoE: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,3}$/,
  contrasena: /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/
}

//metodo de escucha para cuando hay cambios en el input de correo y despues de un submit activa el mensaje correspondiente
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

//metodo de escucha de un click sobre los input de contraseña
window.addEventListener('click', (event) =>{ 
  if(event.target.id == "contrasenaR"){
    contrasenaRegistro.reportValidity();
    contrasenaRegistro.setCustomValidity(
      'La contraseña debe tener al menos 6 caracteres, una mayúscula y un número.'
    );
  }
  if(event.target.id == "validarContrasena"){
    confirmacionContrasenaRegistro.reportValidity();
    confirmacionContrasenaRegistro.setCustomValidity(
      'Las contraseñas no coinciden.'
    );
  }

})

//metodo de escucha sobre cambios en el input de contrasenaRegistro para verificar que cumpla la expresion
contrasenaRegistro.addEventListener('input',function(){
   if(expresiones.contrasena.test(contrasenaRegistro.value)){
    contrasenaRegistro.setCustomValidity('');
   }
})

//metodo de escucha sobre cambios en el input de confirmacionContrasenaRegistro para verificar que cumpla la expresion
confirmacionContrasenaRegistro.addEventListener('input',function(){
  console.log("confirmacion")
  if(confirmacionContrasenaRegistro.value === contrasenaRegistro.value){
   confirmacionContrasenaRegistro.setCustomValidity('');
  }
})




// para eduard, al momento de activar el mensaje con correo.setCustomValidity("¡El correo que ingresaste no es valido!", ); hasta no cumplir esa condicion
//no te va dejar hacer submit, entonces ya no seria necesario de la linea 70 a la 78
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

    /* Valido que la contrasena tenga una mayuscula y un numero y sea de al menos 6 caracteres */
    const esValida = expresiones.contrasena.test(contrasena);
    
    /* si mi contrasenas con iguales y tienen una mayuscula y un numero y tiene al menos 6 caracteres
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



// Codigo para cambiar de visualizacion si el usuario hace un correcto login
//ya hemos llamado al div class bodylogin como body
let usuarioRegistrado = document.querySelector(".usuarioRegistrado");
let botonRealizarIngreso = document.querySelector("#realizarIngreso");
let botonCerrarSesion = document.querySelector("#cerrarSesion");
const formularioIngreso = document.querySelector("#formulario");
let nameUser1 =  document.getElementById('nameUser');

// si existe la variable usuario y tiene contenido, mostramos la vista de perfil y ocultamos la de formularios de registro o ingreso
if(localStorage.getItem('usuario') != undefined){
  if( localStorage.getItem('usuario').length != 0 ){
    bodyLogin.style.display = "none";
    usuarioRegistrado.style.display = "block";
  }
}

//Cuando orpime en ingresar, verifica el usuario y la contraseña, si son correctas muestra el div de perfil y oculta el de formularios de ingreso
botonRealizarIngreso.onclick = function(event) {
  event.preventDefault();
  if(formularioIngreso.usuario.value === "admin" && formularioIngreso.contrasena.value === "1234" ){
    localStorage.setItem( 'usuario', 'admin');
    bodyLogin.style.display = "none";
    usuarioRegistrado.style.display = "block";
    nameUser1.innerText = localStorage.getItem('usuario');
  }
}

//Cuando cierra sesion muestra los formularios y oculta el perfil
botonCerrarSesion.onclick = function() {
  bodyLogin.style.display = "flex";
  usuarioRegistrado.style.display = "none";
  nameUser1.innerText = "Ingresar";
  localStorage.setItem( 'usuario', '');

}

