/* espero a que el documento se cargue, guardo la images en una array
y llamo a la funcion mostrar imagen que me recorre el array y va 
cambiando las características de visibility y opacity se hace una espera entre transición*/

const tiempoCambioPlatos = 4500;

//asignamos el mismo valor del tiempo de cambio de platos a la variable 
const raiz = document.documentElement;
raiz.style.setProperty('--duracionAnimacionTitulos', tiempoCambioPlatos.toString() + 'ms');

/*
funcion carruselPLatos() para obtener cada div interno de .contenedor-slider los cuales
contienen las imágenes de diferentes platos que se irán cambiando según 
la variable tiempoCambioPLatos
*/
function carruselPlatos() {
  let imagenActual = 0;
  // a traves de .contenedor-slider > div > img obtenemos todas las img internas de 
  // .contenedor-slider en un array
  const platos = document.querySelectorAll(".contenedor-slider > div > img");
  function mostrarImagen() {
    platos[imagenActual].style.opacity = "0";
    platos[imagenActual].style.visibility = "hidden";
    imagenActual = (imagenActual + 1) % platos.length;

    platos[imagenActual].style.visibility = "visible";
    setTimeout(() => {
      platos[imagenActual].style.opacity = "1";
    }, 20);
  }
  setInterval(mostrarImagen, tiempoCambioPlatos);
}

/*
funcion resaltarTituloPlatos() para obtener cada span interno de .itemFavoritos los cuales
contienen los títulos de diferentes platos que se irán cambiando según 
la variable tiempoCambioPLatos
*/
function resaltarTituloPlatos(){
  let tituloActual = 0;
  const titulos = document.querySelectorAll(".itemFavoritos > p > span");
  const tituloPlatoCelular = document.getElementById("tituloPlatoCelular");

  function resaltarTitulo() {
    titulos[tituloActual].classList.remove("tituloResaltado");

    tituloActual = (tituloActual + 1) % titulos.length;
    titulos[tituloActual].classList.add("tituloResaltado");

    tituloPlatoCelular.innerText = titulos[tituloActual].textContent;
    tituloPlatoCelular.classList.remove("tituloResaltado");
    // Se le da un tiempo de espera para asignar la clase que contiene la animación
    //y asi esta funcione correctamente.
    setTimeout(()=>{tituloPlatoCelular.classList.add("tituloResaltado")},200);

  }
  
  setInterval(resaltarTitulo , tiempoCambioPlatos); //cada 3s
  
  
}

document.addEventListener("DOMContentLoaded", () => {
    carruselPlatos();
    resaltarTituloPlatos();
});


/* cuando se realiza desplazaminteo en el eje y el objeto scroll se desplaza de iz a der o inversa */
const scrollContainer = document.querySelector(".scroll");
let sumaScroll = 0;

window.addEventListener("scroll", () => {
  sumaScroll = window.scrollY;
  scrollContainer.style.transform = `translateX(-${sumaScroll * 0.5}px)`;
});


/* inicializo el script libreria swiper */
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".slide-content", {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    slidesPerView: "auto",

    // paginacion botones
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Navegacion botones
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
