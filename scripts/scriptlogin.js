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
const modalTerminos = document.getElementById("modalTerminos");
const cerrarTerminos = document.querySelector(".cerrarTerminos");
const terminos = document.getElementById("terminosCondiciones");

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


terminos.addEventListener("click", () => {
  modalTerminos.style.display = "block";
});



// Cerrar la ventana Mensaje Exitoso cuando se haga clic en la "X"
cerrarTerminos.addEventListener("click", () => {
  modalTerminos.style.display = "none";

});


//Código para validación de datos de correo y contraseña
/* expresiones para validar correo y Contrasena */
const expresiones = {
  correoE: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,3}$/,
  contrasena: /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/,
  usuarioRe: /(.*\S\s+\S.*)/
}



let usuarioR = document.getElementById('usuarioR');

//funcion que realiza validacion del valor de usuario, si contiene espacio
//entre palabras se muestra un mensaje.
function validarUsuario(){
  if(!usuarioR.value.includes(" ")){
    usuarioR.setCustomValidity(''); 
  }else{
    usuarioR.setCustomValidity('No debe contener espacios.');
    usuarioR.reportValidity();
  }
}


//método de escucha sobre cambios en el input de usuario para verificar que cumpla la expresión
usuarioR.addEventListener('input',validarUsuario)

//método de escucha para cuando hay cambios en el input de correo y después de un submit activa el mensaje correspondiente
document.getElementById('correo').addEventListener('input', function(){
  
  let validoCorreo = expresiones.correoE.test(correo.value);
  
  if(!validoCorreo){
    correo.setCustomValidity(
      "¡El correo que ingresaste no es valido!",
    );
  }
  else {
    correo.setCustomValidity("");
  }
});


//método de escucha para mostrar siempre el mensaje de advertencia de la clave
// creación de variables de las dos contraseñas
let contrasenaRegistro = document.getElementById('contrasenaR');
let confirmacionContrasenaRegistro = document.getElementById('validarContrasena')

function verificarContrasenaAdecuada(){
  if(expresiones.contrasena.test(contrasenaRegistro.value)){
    contrasenaRegistro.setCustomValidity('');
   }else{
    contrasenaRegistro.setCustomValidity(
      'La contraseña debe tener al menos 6 caracteres, una mayúscula y un número.'
    );
    contrasenaRegistro.reportValidity(); //habilita el mensaje de advertencia
   }
}

function verificarContrasenaIguales(){
  if(confirmacionContrasenaRegistro.value === contrasenaRegistro.value){
    confirmacionContrasenaRegistro.setCustomValidity('');
  }else{
     confirmacionContrasenaRegistro.setCustomValidity(
       'Las contraseñas no coinciden.'
     ); //Se le asigna el mensaje de advertencia
     confirmacionContrasenaRegistro.reportValidity(); //se muestra el mensaje
  }
}

//método de escucha de un click sobre los input de contraseña
window.addEventListener('click', (event) =>{ 
  if(event.target.id == "contrasenaR"){verificarContrasenaAdecuada();}
  if(event.target.id == "validarContrasena"){verificarContrasenaIguales();}
  if(event.target.id == "usuarioR"){validarUsuario();}
})

//método de escucha sobre cambios en el input de contrasenaRegistro para verificar que cumpla la expresión
contrasenaRegistro.addEventListener('input', verificarContrasenaAdecuada)

//método de escucha sobre cambios en el input de confirmacionContrasenaRegistro para verificar que cumpla la expresión
confirmacionContrasenaRegistro.addEventListener('input',verificarContrasenaIguales)


document.getElementById('formularioR').addEventListener('submit', function(event) {
    event.preventDefault();
      modalMensajeExitoso.style.display = 'block'; 
});
   

