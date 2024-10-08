// Código para cambiar de visualización si el usuario hace un correcto login
//divBodyLogin contiene toda la estructura de formularios de registro y de login
//divUsuarioRegistrado es la clase de los dos tipos de perfiles, las traemos en un arreglo, donde 
//el indice 0 es el perfil de un usuario, y el indice 1 es el perfil de un administrador

//javascript que realiza las funciones necesarias para eliminar o modificar un usuario
import * as modificarJSON from "../scripts/scriptModificarJSON.js";

let divBodyLogin = document.querySelector(".bodyLogin");
let divUsuarioRegistrado = document.querySelectorAll(".divUsuarioRegistrado");

let formularioIngreso = document.getElementById("formulario");
let iconoContrasenaLogin = document.getElementById("iconoContrasenaLogin");

//variable para asignar el nombre del usuario en el campo de ingresar del navbar
let nameUser1 =  document.getElementById('sesion');

let tipoUsuario = "";
let indiceTipoUsuario = 0; //si el valor es 1 es administrador, si es 0 es un usuario
let datosUsuario={}; //datos del usuario traídos de la base de datos

let formularioInfoUsuario = document.getElementById('informacionUsuario');
let formularioInfoAdmin = document.getElementById('informacionAdministrador');

// funcion para mostrar perfil ya sea de usuario o de administrador
function mostrarPerfil(){
    averiguarTipoUsuario();
    if(indiceTipoUsuario == 1) mostrarDatosPerfilAdministrador();
    else   mostrarDatosPerfilUsuario();

    divBodyLogin.classList.remove('mostrar');
    divBodyLogin.classList.add('ocultar');
    setTimeout( function(){
        divBodyLogin.style.display = 'none';
        divUsuarioRegistrado[indiceTipoUsuario].style.display = 'block';
        },500 )

    setTimeout(function(){
        divUsuarioRegistrado[indiceTipoUsuario].classList.remove('ocultar');
        divUsuarioRegistrado[indiceTipoUsuario].classList.add('mostrar');
        },500)
}

//funcion para mostrar los formularios de inicio de sesión y de registro cuando se cierre la sesión
function mostrarDivBodyLogin(){
    averiguarTipoUsuario();
    divUsuarioRegistrado[indiceTipoUsuario].classList.remove('mostrar');
    divUsuarioRegistrado[indiceTipoUsuario].classList.add('ocultar');
    setTimeout( function(){
        divBodyLogin.style.display = 'flex';
        divUsuarioRegistrado[indiceTipoUsuario].style.display = 'none';
    },500 )
    setTimeout( function(){
        divBodyLogin.classList.remove('ocultar');
        divBodyLogin.classList.add('mostrar');
    },500 );

    nameUser1.innerText = "Ingresar";
    localStorage.setItem( 'usuario', '');
    localStorage.setItem('datosUsuario', '');
}


// si existe la variable usuario y tiene contenido, mostramos la vista de perfil y ocultamos la de formularios de registro o ingreso
if(localStorage.getItem('usuario') != undefined){
  if( localStorage.getItem('usuario').length != 0 ){
    datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    averiguarTipoUsuario();

    if(indiceTipoUsuario == 1) mostrarDatosPerfilAdministrador();
    else   mostrarDatosPerfilUsuario();

    divBodyLogin.style.display = 'none';
    divUsuarioRegistrado[indiceTipoUsuario].style.display = 'block';
    divUsuarioRegistrado[indiceTipoUsuario].classList.remove('ocultar');
    divUsuarioRegistrado[indiceTipoUsuario].classList.add('mostrar');
  }
}

//funcion para averiguar si el usuario es administrador
function averiguarTipoUsuario(){
  tipoUsuario = datosUsuario.rol;
  if(tipoUsuario == 'admin'){
      indiceTipoUsuario = 1 ;
  }else{
    indiceTipoUsuario = 0 ;
  }
}

function mostrarDatosPerfilUsuario(){
  formularioInfoUsuario.aliasUsuario.value = datosUsuario.id;
  formularioInfoUsuario.nombreUsuario.value = datosUsuario.nombre;
  formularioInfoUsuario.correoUsuario.value = datosUsuario.correo;
  formularioInfoUsuario.telefonoUsuario.value = datosUsuario.telefono;
}

function mostrarDatosPerfilAdministrador(){
formularioInfoAdmin.aliasAdministrador.value = datosUsuario.id;
formularioInfoAdmin.nombreAdministrador.value = datosUsuario.nombre;
formularioInfoAdmin.correoAdministrador.value = datosUsuario.correo;
formularioInfoAdmin.telefonoAdministrador.value = datosUsuario.telefono;
}

// lineas de código para validar el formulario de ingreso

function usuarioVacio(){
  if(formularioIngreso.usuario.value.length == 0){
    formularioIngreso.usuario.setCustomValidity(
      "Escribe el nombre de usuario",
    );
  }
  else {
    formularioIngreso.usuario.setCustomValidity("");
  }
}

function contrasenaVacia(){
  if(formularioIngreso.contrasena.value.length == 0){
    formularioIngreso.contrasena.setCustomValidity(
      "Escribe la contraseña",
    );
  }
  else {
    formularioIngreso.contrasena.setCustomValidity("");
  }
}

formularioIngreso.usuario.addEventListener('input', usuarioVacio);
formularioIngreso.contrasena.addEventListener('input', contrasenaVacia);

//se llaman las funciones al inicio del programa para que se le asigne el mensaje de advertencia deseado
usuarioVacio();
contrasenaVacia();

//código para mostrar la contraseña
iconoContrasenaLogin.addEventListener("click",()=>{
  if(iconoContrasenaLogin.classList[1] == 'bi-eye-fill'){
    iconoContrasenaLogin.classList.remove('bi-eye-fill');
    iconoContrasenaLogin.classList.add('bi-eye-slash');
    formularioIngreso.contrasena.type  = "text";
  }else{
    iconoContrasenaLogin.classList.remove('bi-eye-slash');
    iconoContrasenaLogin.classList.add('bi-eye-fill');
    formularioIngreso.contrasena.type  = "password";
  }
});

//Cuando oprime en ingresar, verifica el usuario y la contraseña, si son correctas muestra el div de perfil y oculta el de formularios de ingreso
formularioIngreso.addEventListener( 'submit', async function(event) {
  event.preventDefault();
  
  let usuarioExiste = false;
  let usuario = formularioIngreso.usuario.value;
  let contrasenaCorrecta = false;
  let contrasenaAVerificar = modificarJSON.encrypt_data(formularioIngreso.contrasena.value);
  
  
  [usuarioExiste, contrasenaCorrecta, datosUsuario] = await modificarJSON.verificarContrasena(usuario,contrasenaAVerificar);

  if(usuarioExiste){
    if(contrasenaCorrecta){
      localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
      localStorage.setItem( 'usuario', datosUsuario.id);
      mostrarPerfil();
      nameUser1.innerText = localStorage.getItem('usuario');
      formularioIngreso.reset();
    }else{
      formularioIngreso.contrasena.setCustomValidity("La contraseña no es correcta", );
      formularioIngreso.contrasena.reportValidity();
    }

  }else{
    formularioIngreso.usuario.setCustomValidity("El usuario no existe", );
    formularioIngreso.usuario.reportValidity();
  }

});

//fin de lineas de código para validar el formulario de ingreso


//Cuando cierra sesión muestra los formularios y oculta el perfil de usuario o de administrador
let botonCerrarSesion = document.querySelectorAll("#cerrarSesion");

//cuando llamamos una funcion en cualquier punto, el sistema lee por primera vez el javascript
//y si encuentra una function llamada en este ejemplo cerrarSesion() con los paréntesis, asi este adentro
// de una condición, el sistema llamara a dicha funcion se cumpla o no la sentencia
botonCerrarSesion[0].addEventListener('click',cerrarSesion);
botonCerrarSesion[1].addEventListener('click',cerrarSesion);


function cerrarSesion(){
    mostrarDivBodyLogin();
}
  
  
