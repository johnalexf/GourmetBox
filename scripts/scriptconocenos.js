/*
Script para:

-> mostrar los contenidos de misión, vision y valores, si el usuario en pantalla reducida los colapsa y pasa a pantalla grande se van a mostrar.
-> Cambiar los estilos de las tarjetas de perfiles para que se convierta en carrusel

*/ 

//Variables para mostrar los contenidos de misión, vision y valores
//Variable de control para que dentro de la función mostrarDivColapsados, se ejecute una sola vez la asignación respectiva
let variableControlColapse = true;
const botonesCollapse = document.querySelectorAll('.accordion-button');
const divContenidoCollapse = document.querySelectorAll(".accordion-collapse");


//Variables para cambiar la vista de las tarjetas a modo carrusel
let variableControlCarrusel = true;
const carouselCards = document.querySelector("#carouselCards");
const aboutUs = carouselCards.querySelector("#about-us"); 
const cardssContainer = carouselCards.querySelectorAll(".cardss-container");
const carouselItem = carouselCards.querySelectorAll(".carousel-item");


// Escuchar el evento de cambio de tamaño de pantalla
  window.addEventListener('resize', cambioPantalla);

// Función que ajusta el valor de aria-expanded basado en el tamaño de la pantalla
function cambioPantalla() {
    
    //instrucciones para mostrar los contenidos de misión, vision y valores
    // Si la pantalla es mayor a 991px
    if (window.innerWidth > 991 &&  variableControlColapse) {
        console.log(window.innerWidth);
        botonesCollapse.forEach(boton => {
            boton.setAttribute('aria-expanded', 'true');
            boton.classList.remove('collapsed');
        });
        divContenidoCollapse.forEach(div => {
            div.classList.add("show");
        });
        variableControlColapse = false;
    }else{
        if(window.innerWidth <= 991 &&  !variableControlColapse){
            variableControlColapse = true;
        }
    }



    //instrucciones para cambiar a carrusel las card
    if(window.innerWidth < 800 && variableControlCarrusel){
        carouselCards.classList.add("carousel");
        carouselCards.classList.add("carousel-dark");
        carouselCards.classList.add("slide");
        aboutUs.classList.remove("about-us");
        aboutUs.classList.add("carousel-inner");
        cardssContainer[0].classList.remove("primero");
        cardssContainer[1].classList.remove("segundo");
        for(let i=1; i < carouselItem.length;i++ ){
            carouselItem[i].classList.remove("active");
        }

        variableControlCarrusel = false;
    }else{
        if(window.innerWidth >= 800 && !variableControlCarrusel){
            carouselCards.classList.remove("carousel");
            carouselCards.classList.remove("carousel-dark");
            carouselCards.classList.remove("slide");
            aboutUs.classList.add("about-us");
            aboutUs.classList.remove("carousel-inner");
            cardssContainer[0].classList.add("primero");
            cardssContainer[1].classList.add("segundo");
            for(let i=0; i < carouselItem.length;i++ ){
                carouselItem[i].classList.add("active");
            }
            variableControlCarrusel = true;
        }
    }
  }
  
  cambioPantalla();
  