//javascript que realiza las funciones necesarias para modificar un usuario
import * as bd from "../scripts/scriptBD.js";

import {
  formularioInfoUsuario,
  formularioInfoAdmin,
  tipoUsuario,
  botonCerrarSesionAdmin,
  botonCerrarSesionUsuario,
  cargarDatosUsuario,
  datosUsuario,
} from "../scripts/scriptloginIngresando.js";

import * as modal from "../scripts/scriptModalesLogin.js"

let botonGuardarCambiosPerfilUsuario = document.getElementById(
  "guardarCambiosPerfilUsuario"
);
let botonEditarPerfilUsuario = document.getElementById("editarPerfilUsuario");
let botonCancelarCambiosPerfilUsuario = document.getElementById(
  "cancelarCambiosPerfilUsuario"
);

//funcion para activar o desactivar los inputs del perfil de usuario
function desactivarInputUsuario(accion) {
    nombreUsuario.disabled = accion;
    correoUsuario.disabled = accion;
    telefonoUsuario.disabled = accion;
}
  
botonEditarPerfilUsuario.addEventListener("click", () => {
    desactivarInputUsuario(false);
    botonEditarPerfilUsuario.style.display = "none";
    botonCerrarSesionUsuario.style.display = "none";
    botonGuardarCambiosPerfilUsuario.style.display = "block";
    botonCancelarCambiosPerfilUsuario.style.display = "block";
});
  
function normalizarVistaEdicionPerfilUsuario() {
    desactivarInputUsuario(true);
    botonGuardarCambiosPerfilUsuario.style.display = "none";
    botonCancelarCambiosPerfilUsuario.style.display = "none";
    botonEditarPerfilUsuario.style.display = "block";
    botonCerrarSesionUsuario.style.display = "block";
    cargarDatosUsuario();
}
  
botonCancelarCambiosPerfilUsuario.addEventListener(
    "click",
    normalizarVistaEdicionPerfilUsuario
);

formularioInfoUsuario.addEventListener("submit", (event) => {
    event.preventDefault();
    modalContrasenaEditarPerfil.style.display = "flex";
});


let botonGuardarCambiosPerfilAdmin = document.getElementById(
  "guardarCambiosPerfilAdmin"
);
let botonEditarPerfilAdmin = document.getElementById("editarPerfilAdmin");
let botonCancelarCambiosPerfilAdmin = document.getElementById(
  "cancelarCambiosPerfilAdmin"
);

//funcion para activar o desactivar los inputs del perfil de Administrador
function desactivarInputAdministrador(accion) {
    nombreAdministrador.disabled = accion;
    correoAdministrador.disabled = accion;
    telefonoAdministrador.disabled = accion;
}
  
botonEditarPerfilAdmin.addEventListener("click", () => {
    desactivarInputAdministrador(false);
    botonEditarPerfilAdmin.style.display = "none";
    botonCerrarSesionAdmin.style.display = "none";
    botonGuardarCambiosPerfilAdmin.style.display = "block";
    botonCancelarCambiosPerfilAdmin.style.display = "block";
});
  
function normalizarVistaEdicionPerfilAdmin() {
    desactivarInputAdministrador(true);
    botonGuardarCambiosPerfilAdmin.style.display = "none";
    botonCancelarCambiosPerfilAdmin.style.display = "none";
    botonEditarPerfilAdmin.style.display = "block";
    botonCerrarSesionAdmin.style.display = "block";
    cargarDatosUsuario();
}
  
botonCancelarCambiosPerfilAdmin.addEventListener(
    "click",
    normalizarVistaEdicionPerfilAdmin
);

formularioInfoAdmin.addEventListener("submit", async (event) => {
    event.preventDefault();
    modalContrasenaEditarPerfil.style.display = "flex";
});
  


let modalContrasenaEditarPerfil = document.getElementById(
  "modalContrasenaEditarPerfil"
);
let botonGuardarEditarPerfil = document.getElementById(
  "botonGuardarEditarPerfil"
);
let contrasenaEditarPerfil = document.getElementById("contrasenaEditarPerfil");
let botonCerrarModalContrasena = document.getElementById(
  "cerrarModalContrasena"
);
let iconoContrasenaEditarPerfil = document.getElementById(
  "iconoContrasenaEditarPerfil"
);

botonCerrarModalContrasena.addEventListener("click", () => {
  modalContrasenaEditarPerfil.style.display = "none";
});

contrasenaEditarPerfil.addEventListener("input", () => {
    contrasenaEditarPerfil.setCustomValidity("");
});
  
  //código para mostrar la contraseña
iconoContrasenaEditarPerfil.addEventListener("click", () => {
    if (iconoContrasenaEditarPerfil.classList[1] == "bi-eye-fill") {
        iconoContrasenaEditarPerfil.classList.remove("bi-eye-fill");
        iconoContrasenaEditarPerfil.classList.add("bi-eye-slash");
        contrasenaEditarPerfil.type = "text";
    } else {
        iconoContrasenaEditarPerfil.classList.remove("bi-eye-slash");
        iconoContrasenaEditarPerfil.classList.add("bi-eye-fill");
        contrasenaEditarPerfil.type = "password";
    }
});




//boton dentro del modal de confirmar contraseña para editar perfil
botonGuardarEditarPerfil.addEventListener("click", async () => {
  modal.modalCargando();

  let contrasena = contrasenaEditarPerfil.value;
  let contrasenaAVerificar = bd.encrypt_data(contrasena);
  let respuesta;
  try{
    if (
      await bd.confirmarContrasenaParaEditarPerfil(
        datosUsuario.userName,
        contrasenaAVerificar
      )
    ) {
      if (tipoUsuario) {
        respuesta =  await bd.reescribirOCrearUsuario(
                          datosUsuario.id,
                          aliasAdministrador.value,
                          nombreAdministrador.value,
                          correoAdministrador.value,
                          telefonoAdministrador.value,
                          contrasenaAVerificar,
                          tipoUsuario,
                          true
                        );

        if(respuesta.status == "ok"){
          datosUsuario.userName = aliasAdministrador.value;
          datosUsuario.nombreUsuario = nombreAdministrador.value;
          datosUsuario.correo = correoAdministrador.value;
          datosUsuario.telefono = telefonoAdministrador.value;
          localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
          contrasenaEditarPerfil.value = "";
          normalizarVistaEdicionPerfilAdmin();
        }
  
      } else {
        respuesta = await bd.reescribirOCrearUsuario(
                        datosUsuario.id,
                        aliasUsuario.value,
                        nombreUsuario.value,
                        correoUsuario.value,
                        telefonoUsuario.value,
                        contrasenaAVerificar,
                        tipoUsuario,
                        true
        );

        if(respuesta.status == "ok"){
          datosUsuario.userName = aliasUsuario.value;
          datosUsuario.nombreUsuario = nombreUsuario.value;
          datosUsuario.correo = correoUsuario.value;
          datosUsuario.telefono = telefonoUsuario.value;
          localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

          normalizarVistaEdicionPerfilUsuario();
          contrasenaEditarPerfil.value = "";
        }
        
      }
      if(respuesta.status == "ok"){
        await modal.cerrarModalCargando();
        modalContrasenaEditarPerfil.style.display = "none";
        modal.mostrarModalConfirmacion("Tu Perfil se ha editado correctamente", "");
      }else{
        modal.cerrarModalCargando();
        modal.modalError();
      }
    } else {
      await modal.cerrarModalCargando();
      contrasenaEditarPerfil.setCustomValidity("La contraseña no es correcta");
      contrasenaEditarPerfil.reportValidity();
    }
  }catch{
    console.log("entro en catch")
    modal.cerrarModalCargando();
    modal.modalError();
  }
});


  