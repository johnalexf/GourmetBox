// document.querySelectorAll('.carta-contenedor').forEach(container => {
//     const visible = container.querySelector('.visible');
//     const oculto = container.querySelector('.oculto');

//     visible.addEventListener('click', function() {
//         container.classList.toggle('show-oculto');
//     });

//     oculto.addEventListener('click', function() {
//         container.classList.toggle('show-oculto');
//     });
// });

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
