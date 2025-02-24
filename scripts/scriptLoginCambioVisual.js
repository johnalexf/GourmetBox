// Código para cambiar de visualización si el usuario hace un correcto login
//divBodyLogin contiene toda la estructura de formularios de registro y de login
//divUsuarioRegistrado es la clase de los dos tipos de perfiles, las traemos en un arreglo, donde
//el indice 0 es el perfil de un usuario, y el indice 1 es el perfil de un administrador
//ademas permite darle dinamismo a los div de iniciar sesión y registro 

//importar la funcion para mostrar la cantidad de productos agregados si la tiene
//y el nombre del usuario
import {
    actualizarNombreYCantidadProductos
  } from "./manipulacionNavbar.js";

// contieneFormulario contiene los dos formularios de ingreso y de registro
const contieneFormulario = document.querySelector(".contieneFormularios");

/* variables para modificar los estilos de las ventanas de los formularios login y registro */
// Botones para hacer el cambio de formulario
const loginBotonCambioVentana = document.querySelector("#ingresoBotonCambioVentana");
const registroBotonCambioVentana = document.querySelector("#registroBotonCambioVentana");

//ventana de ingreso y registro de usuario
let divBodyLogin = document.querySelector(".bodyLogin");
// lista de las ventanas de un usuario registrado, 0 => usuario normal 1=> usuario administrador
let divUsuarioRegistrado = document.querySelectorAll(".divUsuarioRegistrado");

// tiempo de cambio de pantalla de login a perfil o viceversa
const tiempoCambioPantalla = 800;//en mili segundos
document.documentElement.style.setProperty('--tiempoCambioPantalla', tiempoCambioPantalla + 'ms');

//div del dinamismo del repartidor de gourmet box
let divViaje = document.querySelector(".viaje");

// Cuando oprima el botón de registro para cambio de ventana, activa la funcionalidad de los contenedores para hacer el cambio de formularios
registroBotonCambioVentana.onclick = function(){
  contieneFormulario.classList.add('active');
}

// Cuando oprima el botón de login para cambio de ventana, desactiva la funcionalidad de los contenedores para hacer el cambio de formularios
loginBotonCambioVentana.onclick = cambioVentanaALogin;

export function cambioVentanaALogin(){
  contieneFormulario.classList.remove('active');
}

// funcion para mostrar perfil ya sea de usuario o de administrador
export function cambiarAPerfil(indice) {
  
  divBodyLogin.classList.remove("mostrar");
  divBodyLogin.classList.add("ocultar");
  // divViaje.style.display= "none" ;
  setTimeout(function () {
    divBodyLogin.style.display = "none";
    divUsuarioRegistrado[indice].style.display = "block";
  }, tiempoCambioPantalla);

  setTimeout(function () {
    divUsuarioRegistrado[indice].classList.remove("ocultar");
    divUsuarioRegistrado[indice].classList.add("mostrar");
  }, tiempoCambioPantalla + 100);

  actualizarNombreYCantidadProductos();
}

//funcion para mostrar los formularios de inicio de sesión y de registro cuando se cierre la sesión
export function cambiarALogin(indice) {
    
  // divViaje.style.display="block";
  divUsuarioRegistrado[indice].classList.remove("mostrar");
  divUsuarioRegistrado[indice].classList.add("ocultar");

  setTimeout(function () {
    divUsuarioRegistrado[indice].style.display = "none";
    divBodyLogin.style.display = "flex";
  }, tiempoCambioPantalla);
  setTimeout(function () {
    divBodyLogin.classList.remove("ocultar");
    divBodyLogin.classList.add("mostrar");
  }, tiempoCambioPantalla + 100);

  localStorage.setItem("usuario", "");
  localStorage.setItem("datosUsuario", "");
  actualizarNombreYCantidadProductos();
}

const footer = document.querySelector('#footer'); // Selecciona tu footer

/* creación de constante para que al momento de ver un identificador de una sección
en la ventana, cambie a position absolute divViaje, Y posteriormente 
con observer.observe(footer) le indicamos que sea con respecto al footer */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('El footer está visible en la pantalla');
      divViaje.style.position = 'absolute';
    }else{
      divViaje.style.position = '';
    }

  });
});

observer.observe(footer);


