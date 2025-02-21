//Javascript que permite realizar el registro de un nuevo usuario, haciendo las respectivas
//validaciones de los campos requeridos y almacenándolos en la base de datos

//javascript que realiza las funciones necesarias para eliminar o modificar un usuario
import * as bd from "../scripts/scriptBD.js";

import { cambioVentanaALogin } from "./scriptLoginCambioVisual.js";

import * as modal from "./scriptModalesLogin.js";

//Formulario de registro
let formularioRegistro = document.getElementById('formularioR');

//iconos de los campos de contraseñas para poder mostrarla
let iconoContrasenaR = document.getElementById('iconoContrasenaR');
let iconoConfirmarContrasena = document.getElementById('iconoConfirmarContrasena');

// Variables para manipular ventanas emergentes
const modalMensajeExitoso = document.getElementById("modalMensajeExitoso");
const cerrarModalExitoso = document.getElementById("cerrarModalMensajeExitoso"); 
const modalTerminos = document.getElementById("modalTerminos");
const cerrarTerminos = document.querySelector(".cerrarTerminos");

// términos es el link (a) que permite al hacer click abrir el modal de los términos y condiciones
const terminos = document.getElementById("terminosCondiciones");

//espacio de texto que va mostrar el nombre del usuario en el modal de registro exitoso
let nombreUsuarioRegistrado = document.getElementById("nombreUsuarioRegistrado");

/* expresiones para validar correo y Contrasena */
const expresiones = {
  contrasena: /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/,
  correoE: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,3}(\.[a-zA-Z]{2,3})?$/,
  telefono: /^[36][0-9]{9,}$/
}

//código para mostrar la contraseña
iconoContrasenaR.addEventListener("click",()=>{
  if(iconoContrasenaR.classList[1] == 'bi-eye-fill'){
    iconoContrasenaR.classList.remove('bi-eye-fill');
    iconoContrasenaR.classList.add('bi-eye-slash');
    formularioRegistro.contrasenaR.type  = "text";
  }else{
    iconoContrasenaR.classList.remove('bi-eye-slash');
    iconoContrasenaR.classList.add('bi-eye-fill');
    formularioRegistro.contrasenaR.type  = "password";
  }
});

//código para mostrar la contraseña en el campo confirmarContrasena
iconoConfirmarContrasena.addEventListener("click",()=>{
  if(iconoConfirmarContrasena.classList[1] == 'bi-eye-fill'){
    iconoConfirmarContrasena.classList.remove('bi-eye-fill');
    iconoConfirmarContrasena.classList.add('bi-eye-slash');
    formularioRegistro.validarContrasena.type  = "text";
  }else{
    iconoConfirmarContrasena.classList.remove('bi-eye-slash');
    iconoConfirmarContrasena.classList.add('bi-eye-fill');
    formularioRegistro.validarContrasena.type  = "password";
  }
});

// mostrar términos y condiciones
terminos.addEventListener("click", () => {
  modalTerminos.style.display = "flex";
});

// Cerrar la ventana de términos y condiciones cuando se haga clic en la "X"
cerrarTerminos.addEventListener("click", () => {
  modalTerminos.style.display = "none";
});

//funcion que realiza validación del valor de usuario, si contiene espacio
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

//método de escucha para cuando hay cambios en el input de correo y 
// después de un submit activa el mensaje correspondiente
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

//método de escucha cuando hay cambios en el input de teléfono y 
// verificar que cumpla la condición al momento de dar enviar
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

function verificarContrasenaAdecuada(){
  if(expresiones.contrasena.test(formularioRegistro.contrasenaR.value)){
    formularioRegistro.contrasenaR.setCustomValidity('');
   }else{
    formularioRegistro.contrasenaR.setCustomValidity(
      'La contraseña debe tener al menos 6 caracteres, una mayúscula y un número.'
    );
    formularioRegistro.contrasenaR.reportValidity(); //habilita el mensaje de advertencia
   }
}

function verificarContrasenaIguales(){
  if(formularioRegistro.contrasenaR.value === formularioRegistro.validarContrasena.value){
    formularioRegistro.validarContrasena.setCustomValidity('');
  }else{
    formularioRegistro.validarContrasena.setCustomValidity(
       'Las contraseñas no coinciden.'
     ); //Se le asigna el mensaje de advertencia
     formularioRegistro.validarContrasena.reportValidity(); //se muestra el mensaje
  }
}

//método de escucha de un click sobre los input de contraseña y mostrar los mensajes de advertencias
window.addEventListener('click', (event) =>{ 
  if(event.target.id == "contrasenaR"){verificarContrasenaAdecuada();}
  if(event.target.id == "validarContrasena"){verificarContrasenaIguales();}
  if(event.target.id == "usuarioR"){validarUsuario();}
})

//método de escucha sobre cambios en el input de contrasenaR para verificar que cumpla la expresión
formularioRegistro.contrasenaR.addEventListener('input', verificarContrasenaAdecuada)

//método de escucha sobre cambios en el input de validar contraseña para verificar que cumpla la expresión
formularioRegistro.validarContrasena.addEventListener('input',verificarContrasenaIguales)


formularioRegistro.addEventListener('submit', async function(event) {
    modal.modalCargando();
    event.preventDefault();
    validarUsuario();
    
    let usuarioRepetido;
    let usuario = formularioRegistro.usuarioR.value;
    usuarioRepetido = await bd.verificarSiUsuarioExiste(usuario);

    if(usuarioRepetido != undefined){
      if(!usuarioRepetido){
        //reescribirOCrearUsuario(usuario,rol,nombre,correo,telefono,contrasena,Reescribir) 
        //creando usuario en la base de datos
          let respuesta = await bd.reescribirOCrearUsuario(
              "0",
              formularioRegistro.usuarioR.value,
              formularioRegistro.nombreR.value,
              formularioRegistro.correo.value,
              formularioRegistro.telefono.value,
              bd.encrypt_data(formularioRegistro.contrasenaR.value),
              "0",
              false
          );
          await modal.cerrarModalCargando();
          if(respuesta.status == "ok"){
            localStorage.setItem('seRegistro', formularioRegistro.nombreR.value);
            mostrarModalRegistroExitoso();
            cambioVentanaALogin();
          }else{
            modal.modalError();
          }
      }else{
        await modal.cerrarModalCargando();
        setTimeout(formularioRegistro.usuarioR.setCustomValidity('El usuario ya existe.'),300);
        formularioRegistro.usuarioR.reportValidity();
      }
      
    }else{
      await modal.cerrarModalCargando();
      modal.modalError();
    }
   
});
   
//en el localStorage.getItem('seRegistro') guardamos el nombre del usuario correctamente registrado
//para asi mostrar en el modal el mensaje personalizado si se recarga la pagina
function mostrarModalRegistroExitoso(){
  let seRegistro = localStorage.getItem('seRegistro');
  if ( seRegistro && seRegistro.length > 0) {
    nombreUsuarioRegistrado.innerText = seRegistro;
    modalMensajeExitoso.style.display = 'flex'; 
    formularioRegistro.reset();
  }
}

// Cerrar la ventana bienvenido cuando se haga clic en la "X"
cerrarModalExitoso.onclick = function() {
  modalMensajeExitoso.style.display = "none";
  localStorage.setItem('seRegistro',"");
}

mostrarModalRegistroExitoso();
 

