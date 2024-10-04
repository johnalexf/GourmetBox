//javascript que realiza las funciones necesarias para eliminar o modificar un usuario
import * as modificarJSON from "../scripts/scriptModificarJSON.js";

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

//Formulario de registro
let formularioRegistro = document.getElementById('formularioR');

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
  contrasena: /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/,
  correoE: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,3}(\.[a-zA-Z]{2,3})?$/,
  telefono: /^[36][0-9]{9,}$/
}


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
formularioRegistro.usuarioR.addEventListener('input',validarUsuario)


//método de escucha para cuando hay cambios en el input de correo y después de un submit activa el mensaje correspondiente
formularioRegistro.correo.addEventListener('input', function(){
  
  let validoCorreo = expresiones.correoE.test(formularioRegistro.correo.value);
  
  if(!validoCorreo){
    formularioRegistro.correo.setCustomValidity(
      "¡El correo que ingresaste no es valido!",
    );
  }
  else {
    formularioRegistro.correo.setCustomValidity("");
  }
});

//método de escucha cuando hay cambios en el input de teléfono y verificar que cumpla la condición
formularioRegistro.telefono.addEventListener('input', function(){
  
  if(!expresiones.telefono.test(formularioRegistro.telefono.value)){
    formularioRegistro.telefono.setCustomValidity(
      "¡Los números validos empiezan con 6 para fijos o con 3 para celular, max 10 dígitos !",
    );
  }
  else {
    formularioRegistro.telefono.setCustomValidity("");
  }
});

//método de escucha para mostrar siempre el mensaje de advertencia de la clave
// creación de variables de las dos contraseñas
let contrasenaRegistro = document.getElementById('contrasenaR');
let confirmacionContrasenaRegistro = document.getElementById('validarContrasena')

function verificarContrasenaAdecuada(){
  if(expresiones.contrasena.test(contrasenaR.value)){
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

//método de escucha de un click sobre los input de contraseña y mostrar los mensajes de advertencias
window.addEventListener('click', (event) =>{ 
  if(event.target.id == "contrasenaR"){verificarContrasenaAdecuada();}
  if(event.target.id == "validarContrasena"){verificarContrasenaIguales();}
  if(event.target.id == "usuarioR"){validarUsuario();}
})

//método de escucha sobre cambios en el input de contrasenaRegistro para verificar que cumpla la expresión
contrasenaRegistro.addEventListener('input', verificarContrasenaAdecuada)

//método de escucha sobre cambios en el input de confirmacionContrasenaRegistro para verificar que cumpla la expresión
confirmacionContrasenaRegistro.addEventListener('input',verificarContrasenaIguales)


document.getElementById('formularioR').addEventListener('submit', async function(event) {
    event.preventDefault();
    validarUsuario();
    
    let usuarioRepetido;
    let usuario = formularioRegistro.usuarioR.value;
    usuarioRepetido = await modificarJSON.verificarSiUsuarioExiste(usuario);


    if(!usuarioRepetido){
       //reescribirOCrearUsuario(usuario,nombre,correo,telefono,contrasena,Reescribir) 
      await modificarJSON.reescribirOCrearUsuario(
      formularioRegistro.usuarioR.value,
      formularioRegistro.nombreR.value,
      formularioRegistro.correo.value,
      formularioRegistro.telefono.value,
      formularioRegistro.contrasenaR.value,
      false
      );
      modalMensajeExitoso.style.display = 'block'; 
    }else{
      formularioRegistro.usuarioR.setCustomValidity('El usuario ya existe.');
      formularioRegistro.usuarioR.reportValidity();
    }
   
});
   

