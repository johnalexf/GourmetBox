//Este javascript permite darle dinamismo a los div de iniciar sesión y registro 
//Ademas permite realizar el registro de un nuevo usuario, haciendo las respectivas
//validaciones de los campos requeridos y almacenándolos en baseDatos.json

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
let nombreUsuarioRegistrado = document.getElementById("nombreUsuarioRegistrado");
const cerrarModalExitoso = document.getElementById("cerrarModalMensajeExitoso"); 
const modalTerminos = document.getElementById("modalTerminos");
const cerrarTerminos = document.querySelector(".cerrarTerminos");
const terminos = document.getElementById("terminosCondiciones");

//Formulario de registro
let formularioRegistro = document.getElementById('formularioR');
let iconoContrasenaR = document.getElementById('iconoContrasenaR');
let iconoConfirmarContrasena = document.getElementById('iconoConfirmarContrasena');

function mostrarModalRegistroExitoso(){
  let seRegistro = localStorage.getItem('seRegistro');
  if ( seRegistro != undefined && seRegistro.length > 0) {
    nombreUsuarioRegistrado.innerText = seRegistro;
    modalMensajeExitoso.style.display = 'block'; 
    formularioRegistro.reset();
  }
}
mostrarModalRegistroExitoso();


// Cuando oprima el botón de registro para cambio de ventana, activa la funcionalidad de los contenedores para hacer el cambio de formularios
registroBotonCambioVentana.onclick = function(){
    contieneFormulario.classList.add('active');
    bodyLogin.classList.add('active');
}

// Cuando oprima el botón de login para cambio de ventana, desactiva la funcionalidad de los contenedores para hacer el cambio de formularios
loginBotonCambioVentana.onclick = cambioVentanaALogin;

function cambioVentanaALogin(){
  contieneFormulario.classList.remove('active');
  bodyLogin.classList.remove('active');
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
  modalTerminos.style.display = "block";
});
// Cerrar la ventana de términos y condiciones cuando se haga clic en la "X"
cerrarTerminos.addEventListener("click", () => {
  modalTerminos.style.display = "none";
});

// Cerrar la ventana bienvenido cuando se haga clic en la "X"
cerrarModalExitoso.onclick = function() {
  modalMensajeExitoso.style.display = "none";
  localStorage.setItem('seRegistro',"");
}


//Código para validación de datos de correo y contraseña
/* expresiones para validar correo y Contrasena */
const expresiones = {
  contrasena: /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/,
  correoE: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,3}(\.[a-zA-Z]{2,3})?$/,
  telefono: /^[36][0-9]{9,}$/
}


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

//método de escucha cuando hay cambios en el input de teléfono y verificar que cumpla la condición al momento de dar enviar
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
    event.preventDefault();
    validarUsuario();
    
    let usuarioRepetido;
    let usuario = formularioRegistro.usuarioR.value;
    usuarioRepetido = await modificarJSON.verificarSiUsuarioExiste(usuario);


    if(!usuarioRepetido){
       //reescribirOCrearUsuario(usuario,rol,nombre,correo,telefono,contrasena,Reescribir) 
       let seRegistro = formularioRegistro.nombreR.value;
       localStorage.setItem('seRegistro', seRegistro);
       nombreUsuarioRegistrado.innerText = seRegistro;
       modalMensajeExitoso.style.display = 'block'; 
       
        await modificarJSON.reescribirOCrearUsuario(
            formularioRegistro.usuarioR.value,
            "usuario",
            formularioRegistro.nombreR.value,
            formularioRegistro.correo.value,
            formularioRegistro.telefono.value,
            modificarJSON.encrypt_data(formularioRegistro.contrasenaR.value),
            false
          );
          formularioRegistro.reset();
          cambioVentanaALogin();
    }else{
      formularioRegistro.usuarioR.setCustomValidity('El usuario ya existe.');
      formularioRegistro.usuarioR.reportValidity();
    }
   
});
   

