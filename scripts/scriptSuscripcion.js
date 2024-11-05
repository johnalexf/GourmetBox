// Obtener elementos del DOM
const buttons = document.querySelectorAll('.boton-circular');
const modal = document.getElementById('subscriptionModal');
const modalImage = document.getElementById('modalImage'); // Referencia a la imagen del modal
const closeButton = document.querySelector('.close-button');
const cancelButton = document.getElementById('cancelButton');
export const agreeButton = document.getElementById('agreeButton'); // Botón "Estoy de acuerdo"
export let precio = "";
export let nombreSuscripcion = "";


//variables para el modal solicitando realizar un registro 
let modalRealizarRegistro = document.getElementById("modalRealizarRegistro");
let botonCerrarModalRealizarRegistro = document.getElementById("cerrarModalRealizarRegistro");

//variable para verificar si hay un usuario registrado
let usuario = localStorage.getItem('usuario');

// Función para mostrar el modal con la imagen
buttons.forEach((button) => {
    button.addEventListener('click', function() {

        if(usuario == "" || usuario == undefined ){
                modalRealizarRegistro.style.display = "flex";
        }else{
                // Obtener la URL de la imagen
                const imageUrl = button.parentElement.querySelector('img').getAttribute('src');

                // Establecer la imagen en el modal
                modalImage.src = imageUrl; // Establece la URL de la imagen en el modal

                modal.style.display = 'flex'; // Muestra el modal
                document.querySelector('.modal1-contenedor').style.display = 'block'; // Asegúrate de que el contenido esté visible
                
                const objetoC = this.closest(".Objeto");
                precio = objetoC.querySelector(".precio-color").textContent;
                nombreSuscripcion = objetoC.querySelector(".imagen-contenedor img").alt;
        
        }
        
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
    closeModal();
});


botonCerrarModalRealizarRegistro.addEventListener('click',()=>{modalRealizarRegistro.style.display = "none"});
