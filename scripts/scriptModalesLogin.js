//variables para mostrar ventana emergente con una vista previa del producto seleccionado
//  o el nuevo creado y aceptar o cancelar cambios
let botonCancelarCambios = document.getElementById('cancelarCambios');
let divProducto = document.querySelector('.producto');
let modalVistaPrevia = document.getElementById('modalVistaPrevia');
let cerrarVistaPrevia = document.getElementById('cerrarVistaPrevia');

//variables para el modal de eliminar producto
let modalEliminarProducto = document.getElementById('modalEliminarProducto');
let botonCancelarEliminar = document.getElementById('botonCancelarEliminar');
let botonCerrarModalEliminarProducto = document.getElementById('cerrarModalEliminarProducto');


export function mostrarModalConfirmacion(texto1, texto2) {
    Swal.fire({
        icon: 'success',
        title: 'Operación Exitosa',
        text: texto1 + " " + texto2,
        confirmButtonText: 'Aceptar'
      });
}

export function mostrarModalEliminarProducto(){
    modalEliminarProducto.style.display = "flex";
}

export function cerrarModalEliminarProducto(){
    modalEliminarProducto.style.display = "none";
}

botonCerrarModalEliminarProducto.addEventListener( 'click', cerrarModalEliminarProducto);

botonCancelarEliminar.addEventListener('click', cerrarModalEliminarProducto);

export function mostrarModalVistaPreliminar( contenidoHTML ){
    divProducto.innerHTML = contenidoHTML;
    modalVistaPrevia.style.display = 'flex';
}

export function cerrarModalVistaPreliminar(){
    modalVistaPrevia.style.display = 'none';
}

//funcion llamada con el botón de cerrar de vista previa del producto
cerrarVistaPrevia.addEventListener('click',cerrarModalVistaPreliminar());

botonCancelarCambios.addEventListener('click',cerrarModalVistaPreliminar());

export function modalCargando(){
    Swal.fire({
        title: 'Cargando...',
        html: 'Por favor, espere mientras se carga la página.',
        allowOutsideClick: false, // Evita que el usuario cierre la alerta haciendo clic fuera
        didOpen: () => {
          Swal.showLoading(); // Muestra un indicador de carga
        }
      });
}

export function modalError(){
    Swal.fire({
        icon: 'error',
        title: '¡Lo sentimos!',
        text: 'En estos momentos no podemos comunicarnos con el servidor. Inténtalo de nuevo más tarde.',
        confirmButtonText: 'Aceptar'
      });
}
