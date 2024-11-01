//script para poner el nombre de usuario en todas las paginas
let nameUser =  document.getElementById('sesion');
export let usuarioLogiado = "";

// lineas de codigo para poner en negrita segun la pagina en la que se encuentre
let seccionNavbar = document.getElementById(document.title.toLowerCase());

if(seccionNavbar.id != "carrito"){
    seccionNavbar.style.fontWeight = "bold";
}

//lineas de codigo para mostrar la cantidad de productos agregados en el carrito sobre el icono de nabvar 
export let cantidadCarritoIcono = document.getElementById('cantidadCarritoIcono');

export function carritoCantidadAgregadaNavbar(){
    let cantidad = localStorage.getItem('cantidadListaCompras');
    if ( cantidad != undefined) {
        if(cantidad > 0){
            cantidadCarritoIcono.style.display = "block";
            cantidadCarritoIcono.innerText = cantidad; 
        }else{
            cantidadCarritoIcono.style.display = "none"; 
        }
    }
}


if(localStorage.getItem('usuario') != undefined){
    if( localStorage.getItem('usuario').length != 0 ){
        usuarioLogiado = localStorage.getItem('usuario')
        nameUser.innerText = usuarioLogiado;
        carritoCantidadAgregadaNavbar();
    }else{
        nameUser.innerText = "Ingresar";
    }
}

    

