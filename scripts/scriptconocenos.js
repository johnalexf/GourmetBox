document.querySelectorAll('.carta-contenedor').forEach(container => {
    const visible = container.querySelector('.visible');
    const oculto = container.querySelector('.oculto');

    visible.addEventListener('click', function() {
        container.classList.toggle('show-oculto');
    });

    oculto.addEventListener('click', function() {
        container.classList.toggle('show-oculto');
    });
});



function checkScreenSize() {
    if (window.innerWidth >= 899) {
        const accordions = document.querySelectorAll('.accordion-collapse');
        accordions.forEach(accordion => {
            if (!accordion.classList.contains('show')) {
                accordion.classList.add('show');
                accordion.parentElement.querySelector('.accordion-button').setAttribute('aria-expanded', 'true');
            }
        });
    }
}

// Inicializar el estado del acordeón
checkScreenSize();

// Listener para cambios de tamaño de ventana
window.addEventListener('resize', checkScreenSize);
