//javascript que realiza las funciones necesarias para eliminar o modificar un usuario
import * as modificarJSON from "../scripts/scriptModificarJSON.js";

import {formularioInfoUsuario , formularioInfoAdmin, tipoUsuario} from "../scripts/scriptloginIngresando.js";
import { usuarioLogiado } from "./manipulacionNavbar.js";

let botonGuardarCambiosPerfilUsuario = document.getElementById("guardarCambiosPerfilUsuario");
let botonEditarPerfilUsuario = document.getElementById("editarPerfilUsuario");


let botonGuardarCambiosPerfilAdmin = document.getElementById("guardarCambiosPerfilAdmin");
let botonEditarPerfilAdmin = document.getElementById("editarPerfilAdmin");

let modalContrasenaEditarPerfil = document.getElementById("modalContrasenaEditarPerfil");
let botonGuardarEditarPerfil = document.getElementById("botonGuardarEditarPerfil");
let contrasenaEditarPerfil = document.getElementById("contrasenaEditarPerfil");

//funcion para activar o desactivar los inputs del perfil de usuario
function desactivarInputUsuario(accion){
    nombreUsuario.disabled = accion;
    correoUsuario.disabled = accion;
    telefonoUsuario.disabled = accion;
}

//funcion para activar o desactivar los inputs del perfil de Administrador
function desactivarInputAdministrador(accion){
    nombreAdministrador.disabled = accion;
    correoAdministrador.disabled = accion;
    telefonoAdministrador.disabled = accion;
}


botonEditarPerfilUsuario.addEventListener('click', ()=>{
    desactivarInputUsuario(false);
    botonEditarPerfilUsuario.style.display = "none";
    botonGuardarCambiosPerfilUsuario.style.display = "block";
});


botonEditarPerfilAdmin.addEventListener('click', ()=>{
    desactivarInputAdministrador(false);
    botonEditarPerfilAdmin.style.display = "none";
    botonGuardarCambiosPerfilAdmin.style.display = "block";
});


formularioInfoUsuario.addEventListener('submit', (event)=>{
    event.preventDefault();
    modalContrasenaEditarPerfil.style.display = "block";
});

formularioInfoAdmin.addEventListener('submit', async (event)=>{
    event.preventDefault();
    modalContrasenaEditarPerfil.style.display = "block";
});

botonGuardarEditarPerfil.addEventListener('click',async ()=>{

    console.log("contrasena editar perfil");
    let contrasena = contrasenaEditarPerfil.value;
    let contrasenaAVerificar = modificarJSON.encrypt_data(contrasena);
    if(await modificarJSON.confirmarContrasenaParaEditarPerfil(usuarioLogiado,contrasenaAVerificar)){
        if(tipoUsuario == "admin"){
            //reescribirOCrearUsuario(usuario,nombre,correo,telefono,contrasena,Reescribir)
            await modificarJSON.reescribirOCrearUsuario(
                aliasAdministrador.value,
                tipoUsuario,
                nombreAdministrador.value,
                correoAdministrador.value,
                telefonoAdministrador.value,
                contrasenaAVerificar,
                true
            );
            desactivarInputAdministrador(true);
            botonGuardarCambiosPerfilAdmin.style.display = "none";
            botonEditarPerfilAdmin.style.display = "block";
        }else{
            await modificarJSON.reescribirOCrearUsuario(
                aliasUsuario.value,
                tipoUsuario,
                nombreUsuario.value,
                correoUsuario.value,
                telefonoUsuario.value,
                contrasenaAVerificar,
                true
            );

            desactivarInputUsuario(true);
            botonGuardarCambiosPerfilUsuario.style.display = "none";
            botonEditarPerfilUsuario.style.display = "block";
        }
        modalContrasenaEditarPerfil.style.display = "none";

    }else{
        contrasenaEditarPerfil.setCustomValidity("La contraseña no es correcta", );
        contrasenaEditarPerfil.reportValidity();
    }

});

contrasenaEditarPerfil.addEventListener('input', ()=> { 
    contrasenaEditarPerfil.setCustomValidity("", );
})

