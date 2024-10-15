//script para poner el nombre de usuario en todas las paginas
let nameUser =  document.getElementById('sesion');
if(localStorage.getItem('usuario') != undefined){
    if( localStorage.getItem('usuario').length != 0 ){
        nameUser.innerText = localStorage.getItem('usuario');
    }else{
        nameUser.innerText = "Ingresar";
    }
}

// lineas de codigo para poner en negrita segun la pagina en la que se encuentre
let seccionNavbar = document.getElementById(document.title.toLowerCase());
seccionNavbar.style.fontWeight = "bold";



//lineas de codigo para mostrar la cantidad de productos agregados en el carrito sobre el icono de nabvar 
let cantidadCarritoIcono = document.getElementById('cantidadCarritoIcono');

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

carritoCantidadAgregadaNavbar();
    

