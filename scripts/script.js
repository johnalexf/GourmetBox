
/* espero a que el documento se cargue, guardo la images en una array
y llamo a la funcion mostrar imagen que me recorreo el array y va 
cambiando las caracteristicas de visibility y opacity se hace una espera entre transicion*/
document.addEventListener('DOMContentLoaded', () => {
    let imagenActual = 0;
    const platos = document.querySelectorAll('.contenedor-slider > div:not(.fondo)');

    function mostrarImagen() {
        platos[imagenActual].querySelector('img').style.opacity = '0';
        platos[imagenActual].querySelector('img').style.visibility = 'hidden';
        imagenActual = (imagenActual + 1) % platos.length;
        
        platos[imagenActual].querySelector('img').style.visibility = 'visible';
        setTimeout(() => {
            platos[imagenActual].querySelector('img').style.opacity = '1';
        }, 20);
    }
    setInterval(mostrarImagen, 3000);//cada 3s

});

/* lo mismo que arriba pero pos aja pa los titulos de los platos */

document.addEventListener('DOMContentLoaded', () => {
    let tituloActual = 0;
    const titulos = document.querySelectorAll('.itemFavoritos > p > span');

    function mostrarImagen() {
        titulos[tituloActual].style.fontSize = '16px';
        titulos[tituloActual].style.color = 'white';
        titulos[tituloActual].style.textDecoration = 'none';
        tituloActual = (tituloActual + 1) % titulos.length;
       
            titulos[tituloActual].style.fontSize = '20px';
            titulos[tituloActual].style.color = '#70349E';
            titulos[tituloActual].style.textDecoration = 'underline';
    }
    setInterval(mostrarImagen, 3000);//cada 3s

});

/* cuando se realiza desplazaminteo en el eje y el objeto scroll se desplaza de iz a der o inversa */
const scrollContainer = document.querySelector('.scroll');
let sumaScroll = 0;

window.addEventListener('scroll', () => {
    sumaScroll = window.scrollY;
    scrollContainer.style.transform = `translateX(-${sumaScroll * 0.5}px)`;
});


/* inicializo el script libreria swiper */
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.slide-content', {
        loop: true,
        grabCursor: true,
        spaceBetween: 30,
        slidesPerView: "auto",
      
        // paginacion botones
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },

         // Navegacion botones
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
  });
});

/* se mostrara el titulo y el plato linea vertical 
solo se mostrara un titulo el del plato que se ve */


function mostrarTitulosC(){
    let tituloActual = 1;
    const titulos = document.querySelectorAll('.itemFavoritos > p > span');
    const ubicacionTitulo = document.getElementById("tituloP");

    function mostrarImagen() {
        ubicacionTitulo.innerText = titulos[tituloActual].textContent;
        tituloActual = (tituloActual + 1) % titulos.length;
    }
    setInterval(mostrarImagen, 3000);//cada 3s

};



/* espero a que el documento se cargue, guardo la images en una array
y llamo a la funcion mostrar imagen que me recorreo el array y va 
cambiando las caracteristicas de visibility y opacity se hace una espera entre transicion*/
function mostrarImgC(){
    let imagenActual = 0;
    const platos = document.querySelectorAll('.sliderC > div');

    function mostrarImagen() {
        platos[imagenActual].querySelector('img').style.opacity = '0';
        setTimeout(() => {
        platos[imagenActual].querySelector('img').style.visibility = 'hidden';
        imagenActual = (imagenActual + 1) % platos.length;
        platos[imagenActual].querySelector('img').style.visibility = 'visible';
        
        setTimeout(() => {
            platos[imagenActual].querySelector('img').style.opacity = '1';
        }, 20);
    },500);
    }
    setInterval(mostrarImagen, 3000);//cada 3s
    
};



/* si la pantalla es celular cambio la manera en que se ve 
se cambia el div actual y se pone el exclusivo de mobil*/

function ajustarVista(){
    const favoritosG = document.getElementById("favoritos");
    const favoritosC = document.getElementById("favoritosC");

    if(window.innerWidth < 750){
        favoritosG.style.display = "none";
        favoritosC.style.display = "block";
        mostrarTitulosC();
        mostrarImgC();
        
    }else{
        favoritosG.style.display = "grid";
        favoritosC.style.display = "none";
    }

};


window.addEventListener("resize", ajustarVista);
ajustarVista();



