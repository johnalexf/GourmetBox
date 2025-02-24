//script para poner el nombre de usuario en todas las paginas
let sesionNavbar =  document.getElementById('sesion');
export let usuarioLogiado = "";

// lineas de código para poner en negrita según la pagina en la que se encuentre
export let seccionNavbar = document.getElementById(document.title.toLowerCase());

if(seccionNavbar.id != "carrito"){
    seccionNavbar.style.fontWeight = "bold";
}

//lineas de código para mostrar la cantidad de productos agregados en el carrito sobre el icono de navbar 
export let cantidadCarritoIcono = document.getElementById('cantidadCarritoIcono');

export function carritoCantidadAgregadaNavbar(){
    let cantidad = localStorage.getItem('cantidadListaCompras');
    if ( cantidad ) {
        if(cantidad > 0){
            cantidadCarritoIcono.style.display = "block";
            cantidadCarritoIcono.innerText = cantidad; 
        }else{
            cantidadCarritoIcono.style.display = "none"; 
        }
    }else{
        cantidadCarritoIcono.style.display = "none"; 
    }
}

export function actualizarNombreYCantidadProductos(){
    if(localStorage.getItem('usuario')){
        if( localStorage.getItem('usuario').length != 0 ){
            usuarioLogiado = localStorage.getItem('usuario')
            sesionNavbar.innerText = usuarioLogiado;
            sesionNavbar.style.fontWeight = "bold";
            carritoCantidadAgregadaNavbar();
        }else{
            sesionNavbar.innerText = "Ingresar";
            cantidadCarritoIcono.style.display = "none";
        }
    }else{
        sesionNavbar.innerText = "Ingresar";
        cantidadCarritoIcono.style.display = "none";
    }
}

actualizarNombreYCantidadProductos();

// Funcion para cerrar navbar cuando se hace click por fuera de este
document.addEventListener('click', function (event) {
    const navbar = document.querySelector('.navbar-collapse');
    const target = event.target;
  
    if (!navbar.contains(target) && navbar.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler');
      toggler.click();
    }
  });

    

