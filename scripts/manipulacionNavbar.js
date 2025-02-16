//script para poner el nombre de usuario en todas las paginas
let sesionNavbar =  document.getElementById('sesion');
export let usuarioLogiado = "";

// lineas de codigo para poner en negrita segun la pagina en la que se encuentre
export let seccionNavbar = document.getElementById(document.title.toLowerCase());

if(seccionNavbar.id != "carrito"){
    seccionNavbar.style.fontWeight = "bold";
}

//lineas de codigo para mostrar la cantidad de productos agregados en el carrito sobre el icono de nabvar 
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
    }
}


if(localStorage.getItem('usuario')){
    if( localStorage.getItem('usuario').length != 0 ){
        usuarioLogiado = localStorage.getItem('usuario')
        sesionNavbar.innerText = usuarioLogiado;
        sesionNavbar.style.fontWeight = "bold";
        carritoCantidadAgregadaNavbar();
    }else{
        sesionNavbar.innerText = "Ingresar";
    }
}

    

