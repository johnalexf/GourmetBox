//javascript que realiza las funciones necesarias para modificar un usuario
import * as bd from "../scripts/scriptBD.js";

import {formularioInfoUsuario , formularioInfoAdmin, tipoUsuario, 
        botonCerrarSesionAdmin, botonCerrarSesionUsuario, cargarDatosUsuario , datosUsuario} 
        from "../scripts/scriptloginIngresando.js";


let botonGuardarCambiosPerfilUsuario = document.getElementById("guardarCambiosPerfilUsuario");
let botonEditarPerfilUsuario = document.getElementById("editarPerfilUsuario");
let botonCancelarCambiosPerfilUsuario = document.getElementById("cancelarCambiosPerfilUsuario");


let botonGuardarCambiosPerfilAdmin = document.getElementById("guardarCambiosPerfilAdmin");
let botonEditarPerfilAdmin = document.getElementById("editarPerfilAdmin");
let botonCancelarCambiosPerfilAdmin = document.getElementById("cancelarCambiosPerfilAdmin");

let modalContrasenaEditarPerfil = document.getElementById("modalContrasenaEditarPerfil");
let botonGuardarEditarPerfil = document.getElementById("botonGuardarEditarPerfil");
let contrasenaEditarPerfil = document.getElementById("contrasenaEditarPerfil");
let botonCerrarModalContrasena = document.getElementById("cerrarModalContrasena");
let iconoContrasenaEditarPerfil = document.getElementById("iconoContrasenaEditarPerfil");


// variable que contiene el modal de confirmación de operación
let modalConfirmacionDeOperacion = document.getElementById("modalConfirmacionDeOperacion");
let contenidoConfirmacion = document.getElementById("contenidoConfirmacion");
let cerrarModalConfirmacionOperacion = document.getElementById("cerrarModalConfirmacionDeOperacion");
let mensajesSegunConfirmacion = ["Tu Perfil se ha editado correctamente", 
                                "Se ha borrado el producto",
                                "Se ha editado el producto",
                                "Se ha guardado el producto" ];


//funcion para activar o desactivar los inputs del perfil de usuario
function desactivarInputUsuario(accion){
    nombreUsuario.disabled = accion;
    correoUsuario.disabled = accion;
    telefonoUsuario.disabled = accion;
}

botonEditarPerfilUsuario.addEventListener('click', ()=>{
    desactivarInputUsuario(false);
    botonEditarPerfilUsuario.style.display = "none";
    botonCerrarSesionUsuario.style.display = "none";
    botonGuardarCambiosPerfilUsuario.style.display = "block";
    botonCancelarCambiosPerfilUsuario.style.display = "block";
});

function normalizarVistaEdicionPerfilUsuario(){
    desactivarInputUsuario(true);
    botonGuardarCambiosPerfilUsuario.style.display = "none";
    botonCancelarCambiosPerfilUsuario.style.display = "none";
    botonEditarPerfilUsuario.style.display = "block";
    botonCerrarSesionUsuario.style.display = "block";
    cargarDatosUsuario();
}

botonCancelarCambiosPerfilUsuario.addEventListener( 'click' , normalizarVistaEdicionPerfilUsuario);


//funcion para activar o desactivar los inputs del perfil de Administrador
function desactivarInputAdministrador(accion){
    nombreAdministrador.disabled = accion;
    correoAdministrador.disabled = accion;
    telefonoAdministrador.disabled = accion;
}


botonEditarPerfilAdmin.addEventListener('click', ()=>{
    desactivarInputAdministrador(false);
    botonEditarPerfilAdmin.style.display = "none";
    botonCerrarSesionAdmin.style.display = "none";
    botonGuardarCambiosPerfilAdmin.style.display = "block";
    botonCancelarCambiosPerfilAdmin.style.display = "block";
});

function normalizarVistaEdicionPerfilAdmin(){
    desactivarInputAdministrador(true);
    botonGuardarCambiosPerfilAdmin.style.display = "none";
    botonCancelarCambiosPerfilAdmin.style.display = "none";
    botonEditarPerfilAdmin.style.display = "block";
    botonCerrarSesionAdmin.style.display = "block";
    cargarDatosUsuario();
}

botonCancelarCambiosPerfilAdmin.addEventListener('click', normalizarVistaEdicionPerfilAdmin);

botonCerrarModalContrasena.addEventListener('click',()=>{
    modalContrasenaEditarPerfil.style.display = "none";
});

formularioInfoUsuario.addEventListener('submit', (event)=>{
    event.preventDefault();
    modalContrasenaEditarPerfil.style.display = "flex";
});

formularioInfoAdmin.addEventListener('submit', async (event)=>{
    event.preventDefault();
    modalContrasenaEditarPerfil.style.display = "flex";
});

//boton dentro del modal de confirmar contraseña para editar perfil
botonGuardarEditarPerfil.addEventListener('click',async ()=>{

    let contrasena = contrasenaEditarPerfil.value;
    let contrasenaAVerificar = bd.encrypt_data(contrasena);
    if(await bd.confirmarContrasenaParaEditarPerfil(datosUsuario.userName,contrasenaAVerificar)){
        if(tipoUsuario){

            //
            //await bd.reescribirOCrearUsuario(
            bd.reescribirOCrearUsuario(
                datosUsuario.id,
                aliasAdministrador.value,
                nombreAdministrador.value,
                correoAdministrador.value,
                telefonoAdministrador.value,
                contrasenaAVerificar,
                tipoUsuario,
                true
            );

            datosUsuario.userName = aliasAdministrador.value;
            datosUsuario.nombreUsuario = nombreAdministrador.value;
            datosUsuario.correo = correoAdministrador.value;
            datosUsuario.telefono = telefonoAdministrador.value;
            // datosUsuario.suscripcionId = 
            // datosUsuario.esAdministrador = tipoUsuario;
            localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario) );

            contrasenaEditarPerfil.value="";
            normalizarVistaEdicionPerfilAdmin();
        }else{

            //await bd.reescribirOCrearUsuario(
            bd.reescribirOCrearUsuario(
                datosUsuario.id,
                aliasUsuario.value,
                nombreUsuario.value,
                correoUsuario.value,
                telefonoUsuario.value,
                contrasenaAVerificar,
                tipoUsuario,
                true
            );

            datosUsuario.userName = aliasUsuario.value;
            datosUsuario.nombreUsuario = nombreUsuario.value;
            datosUsuario.correo = correoUsuario.value;
            datosUsuario.telefono = telefonoUsuario.value;
            localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario) );

            normalizarVistaEdicionPerfilUsuario();
            contrasenaEditarPerfil.value = "";
        }
        modalContrasenaEditarPerfil.style.display = "none";
        mostrarModalConfirmacion(0,"");
    }else{
        contrasenaEditarPerfil.setCustomValidity("La contraseña no es correcta", );
        contrasenaEditarPerfil.reportValidity();
    }

});

contrasenaEditarPerfil.addEventListener('input', ()=> { 
    contrasenaEditarPerfil.setCustomValidity("", );
})


//código para mostrar la contraseña
iconoContrasenaEditarPerfil.addEventListener("click",()=>{
    if(iconoContrasenaEditarPerfil.classList[1] == 'bi-eye-fill'){
      iconoContrasenaEditarPerfil.classList.remove('bi-eye-fill');
      iconoContrasenaEditarPerfil.classList.add('bi-eye-slash');
      contrasenaEditarPerfil.type  = "text";
    }else{
      iconoContrasenaEditarPerfil.classList.remove('bi-eye-slash');
      iconoContrasenaEditarPerfil.classList.add('bi-eye-fill');
      contrasenaEditarPerfil.type  = "password";
    }
  });

export function mostrarModalConfirmacion(index, texto){
    contenidoConfirmacion.innerHTML = `<p> ${mensajesSegunConfirmacion[index]} <b>${texto}</b>  </p>`; 
    modalConfirmacionDeOperacion.style.display = "flex";
}

cerrarModalConfirmacionOperacion.addEventListener('click',()=>{
    modalConfirmacionDeOperacion.style.display = "none";
});