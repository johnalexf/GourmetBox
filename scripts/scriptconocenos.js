const tarjetas = document.querySelectorAll(".swiper-slide");

tarjetas.forEach( tarjeta =>{
    const btnGirar = tarjeta.querySelector('.simboloGirar');
    btnGirar.addEventListener('click',
            ()=> tarjeta.classList.toggle('girar')
        )
});

const accordions = document.querySelectorAll(".accordion-collapse");

function checkScreenSize() {
  if (window.innerWidth >= 992) {
    accordions.forEach((accordion) => {
      if (!accordion.classList.contains("show")) {
        accordion.classList.add("show");
        const accordionButton = accordion.parentElement.querySelector(".accordion-button");
        accordionButton.setAttribute("aria-expanded", "true");
        accordionButton.classList.remove("collapsed")
      }
    });
  }else{
    accordions.forEach((accordion) => {
        if (accordion.classList.contains("show")) {
          accordion.classList.remove("show");
          const accordionButton = accordion.parentElement.querySelector(".accordion-button");
          accordionButton.setAttribute("aria-expanded", "false");
          accordionButton.classList.add("collapsed")
        }
      });
  }
}

// Inicializar el estado del acordeón
checkScreenSize();

// Listener para cambios de tamaño de ventana
window.addEventListener("resize", checkScreenSize);

function inicializarSwiper(){
    const swiper = new Swiper(".swiper", {
        loop: true,
        grabCursor: true,
        // spaceBetween: 30,
        slidesPerView: "auto", //habilita poder editar el tamaño de cada slide
    
        // pagination botones
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
    });
}



document.addEventListener("DOMContentLoaded", () => {
    inicializarSwiper();
  });
  