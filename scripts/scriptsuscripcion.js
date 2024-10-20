// Obtener elementos del DOM
const buttons = document.querySelectorAll('.boton-circular');
const modal = document.getElementById('subscriptionModal');
const subscriptionNameSpan = document.getElementById('subscriptionName');
const closeButton = document.querySelector('.close-button');
const cancelButton = document.getElementById('cancelButton');

// Función para mostrar el modal con el nombre del plan
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const planName = button.parentElement.querySelector('ul li:first-child').textContent;
        subscriptionNameSpan.textContent = planName;
        modal.style.display = 'flex';
        document.querySelector('.modal-content').style.display = 'block'; // Asegúrate de que el contenido esté visible
    });
});

// Función para cerrar el modal
const closeModal = () => {
    modal.style.display = 'none';
    document.querySelector('.modal-content').style.display = 'none'; // Oculta el contenido del modal también
};

// Eventos para cerrar el modal
closeButton.addEventListener('click', closeModal);
cancelButton.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        closeModal();
    }
});

// Ocultar el modal al cargar la página
window.addEventListener('load', () => {
    modal.style.display = 'none'; // Asegúrate de que el modal esté oculto al cargar
});
