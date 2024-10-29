// Obtener elementos del DOM
const buttons = document.querySelectorAll('.boton-circular');
const modal = document.getElementById('subscriptionModal');
const modalImage = document.getElementById('modalImage'); // Referencia a la imagen del modal
const closeButton = document.querySelector('.close-button');
const cancelButton = document.getElementById('cancelButton');
const agreeButton = document.getElementById('agreeButton'); // Botón "Estoy de acuerdo"

// Función para mostrar el modal con la imagen
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Obtener la URL de la imagen
        const imageUrl = button.parentElement.querySelector('img').getAttribute('src');

        // Establecer la imagen en el modal
        modalImage.src = imageUrl; // Establece la URL de la imagen en el modal

        modal.style.display = 'flex'; // Muestra el modal
        document.querySelector('.modal1-contenedor').style.display = 'block'; // Asegúrate de que el contenido esté visible
    });
});

// Función para cerrar el modal
const closeModal = () => {
    modal.style.display = 'none'; // Oculta el modal
    document.querySelector('.modal1-contenedor').style.display = 'none'; // Oculta el contenido del modal también
};

// Eventos para cerrar el modal
closeButton.addEventListener('click', closeModal);
cancelButton.addEventListener('click', closeModal);
agreeButton.addEventListener('click', () => {
    // alert("Has adquirido el plan de suscripción.");
    closeModal();
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Ocultar el modal al cargar la página
window.addEventListener('load', () => {
    modal.style.display = 'none'; // Asegúrate de que el modal esté oculto al cargar
});



const botonAzul = document.querySelector(".botonAzul");

botonAzul.addEventListener("click", () => {
    const modalPago = document.querySelector(".contenedorPago");
    modalPago.style.display = "block";
});



const numberTC = document.getElementById("number");
const nombreTC = document.getElementById("nameCreditCard");
const fechaV = document.getElementById("fechaV");
const cvv = document.getElementById("inputCVV");
const inputNumber = document.getElementById("numberCT");
const inputNombre = document.getElementById("nombreCT");
const expiraDate = document.getElementById("expiraDate");

inputNumber.addEventListener("input", () => {
    numberTC.textContent = inputNumber.value;
});

inputNombre.addEventListener("input", () => {
    nombreTC.textContent = inputNombre.value;
});

expiraDate.addEventListener("input", () => {
    const fecha = expiraDate.value;
    const [year , mes] = fecha.split("-");
    fechaV.textContent = `${mes}/${year.slice(-2)}`;
});

cvv.addEventListener("click", () => {

    const frente = document.getElementById("frente");
    const atras = document.getElementById("atras");

    if(frente.style.visibility === "visible"){
        frente.style.visibility = "hidden";
        frente.style.opacity = "0";

        atras.style.visibility = "visible";
        atras.style.opacity = "1";
    }else{
        atras.style.visibility = "hidden";
        atras.style.opacity = "0";

        frente.style.visibility = "visible";
        frente.style.opacity = "1";
    }

});

cvv.addEventListener("input", () => {
    const cvvP = document.getElementById("lineaBlanca");
    cvvP.textContent = cvv.value;
});