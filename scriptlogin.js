
/* variables para modificar los estilos y acceder a los datos */
const loginBtn = document.querySelector(".ingresoBoton");
const registroBtn = document.querySelector(".registroBoton");

const contieneFormulario = document.querySelector(".contieneFormularios");
const body = document.querySelector(".bodyLogin");

// Variables para manipular ventanas emergentes
var modalContinuarFormulario = document.getElementById("modalContinuarFormulario");
var modalMensajeExitoso = document.getElementById("modalMensajeExitoso");
var cerrarModalExitoso = document.getElementsByClassName("cerrar")[0]; //Esta instrucción se parece a document.querySelectorAll

registroBtn.onclick = function(){
    contieneFormulario.classList.add('active');
    body.classList.add('active');
}

loginBtn.onclick = function(){
    contieneFormulario.classList.remove('active');
    body.classList.remove('active');
}



function verificarEmail(){
    if(!expresiones.correo.test(email.value)){
      email.setCustomValidity(
        "¡El correo que ingresaste no es valido!",
      );
    } else {
      email.setCustomValidity("");
    }
  }
