/* Este javascript se encarga de verificar los datos para cuando un usuario desea ingresar y
  para cuando cierra sesión, realizando el debido cambio de visual
*/

//javascript que realiza las funciones necesarias para acceder a la base de datos de usuarios
import * as bd from "../scripts/scriptBD.js";

//javascript que cambia la vista de login a perfil o viceversa
import * as visual from "../scripts/scriptLoginCambioVisual.js";

import {actualizarProductosLocal} from "../scripts/scriptModificarProducto.js";

import * as modal from "./scriptModalesLogin.js";

let formularioIngreso = document.getElementById("formulario");
let iconoContrasenaLogin = document.getElementById("iconoContrasenaLogin");

export let tipoUsuario = "";//si el valor es 1 es administrador, si es 0 es un usuario
export let datosUsuario = {}; //datos del usuario traídos de la base de datos

export let formularioInfoUsuario =
  document.getElementById("informacionUsuario");
export let formularioInfoAdmin = document.getElementById(
  "informacionAdministrador"
);

export let botonCerrarSesionAdmin =
  document.getElementById("cerrarSesionAdmin");
export let botonCerrarSesionUsuario = document.getElementById(
  "cerrarSesionUsuario"
);

// si existe la variable usuario y tiene contenido, mostramos la vista de perfil y ocultamos la de formularios de registro o ingreso
function mostrarPerfil() {
  if (localStorage.getItem("usuario")) {
    if (localStorage.getItem("usuario").length != 0) {
      cargarDatosUsuario();
      visual.cambiarAPerfil(tipoUsuario);
      tipoUsuario == 1 ? actualizarProductosLocal() : null
      modal.cerrarModalCargando();
    }
  }
}

export function cargarDatosUsuario(){
  datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
  tipoUsuario = +datosUsuario.esAdministrador;
  tipoUsuario == 1 ?
  mostrarDatosPerfilAdministrador():
  mostrarDatosPerfilUsuario()
}

function mostrarDatosPerfilUsuario() {
  formularioInfoUsuario.aliasUsuario.value = datosUsuario.userName;
  formularioInfoUsuario.nombreUsuario.value = datosUsuario.nombreUsuario;
  formularioInfoUsuario.correoUsuario.value = datosUsuario.correo;
  formularioInfoUsuario.telefonoUsuario.value = datosUsuario.telefono;
}

function mostrarDatosPerfilAdministrador() {
  formularioInfoAdmin.aliasAdministrador.value = datosUsuario.userName;
  formularioInfoAdmin.nombreAdministrador.value = datosUsuario.nombreUsuario;
  formularioInfoAdmin.correoAdministrador.value = datosUsuario.correo;
  formularioInfoAdmin.telefonoAdministrador.value = datosUsuario.telefono;
}

mostrarPerfil();

botonCerrarSesionAdmin.addEventListener("click", cerrarSesion);
botonCerrarSesionUsuario.addEventListener("click", cerrarSesion);

function cerrarSesion() {
  visual.cambiarALogin(tipoUsuario);
}

// lineas de código para validar el formulario de ingreso
function usuarioVacio() {
  if (formularioIngreso.usuario.value.length == 0) {
    formularioIngreso.usuario.setCustomValidity("Escribe el nombre de usuario");
  } else {
    formularioIngreso.usuario.setCustomValidity("");
  }
}

function contrasenaVacia() {
  if (formularioIngreso.contrasena.value.length == 0) {
    formularioIngreso.contrasena.setCustomValidity("Escribe la contraseña");
  } else {
    formularioIngreso.contrasena.setCustomValidity("");
  }
}

formularioIngreso.usuario.addEventListener("input", usuarioVacio);
formularioIngreso.contrasena.addEventListener("input", contrasenaVacia);

//se llaman las funciones al inicio del programa para que se le asigne el mensaje de advertencia deseado
usuarioVacio();
contrasenaVacia();

//código para mostrar la contraseña
iconoContrasenaLogin.addEventListener("click", () => {
  if (iconoContrasenaLogin.classList[1] == "bi-eye-fill") {
    iconoContrasenaLogin.classList.remove("bi-eye-fill");
    iconoContrasenaLogin.classList.add("bi-eye-slash");
    formularioIngreso.contrasena.type = "text";
  } else {
    iconoContrasenaLogin.classList.remove("bi-eye-slash");
    iconoContrasenaLogin.classList.add("bi-eye-fill");
    formularioIngreso.contrasena.type = "password";
  }
});

//Cuando oprime en ingresar, verifica el usuario y la contraseña, 
// si son correctas muestra el div de perfil y oculta el de formularios de ingreso
formularioIngreso.addEventListener("submit", 
  async function (event) {
    modal.modalCargando();
    event.preventDefault();

    let usuarioExiste = false;
    let usuario = formularioIngreso.usuario.value;
    let contrasenaCorrecta = false;
    let contrasenaAVerificar = bd.encrypt_data(
      formularioIngreso.contrasena.value
    );

    try{
      [usuarioExiste, contrasenaCorrecta, datosUsuario] =
        await bd.verificarContrasena(usuario, contrasenaAVerificar);
      
      if (usuarioExiste) {
        if (contrasenaCorrecta) {
          localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
          localStorage.setItem("usuario", datosUsuario.userName);
          mostrarPerfil();
          formularioIngreso.reset();
        } else {
          await modal.cerrarModalCargando();
          formularioIngreso.contrasena.setCustomValidity(
            "La contraseña no es correcta"
          );
          formularioIngreso.contrasena.reportValidity();
        }
      } else {
        await modal.cerrarModalCargando();
        formularioIngreso.usuario.setCustomValidity("El usuario no existe");
        formularioIngreso.usuario.reportValidity();
      }
      
    }catch{
      await modal.cerrarModalCargando();
      modal.modalError();
    }
});

//fin de lineas de código para validar el formulario de ingreso