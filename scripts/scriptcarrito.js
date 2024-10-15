let listaCompras = [];

//importacion de la funcion que permite modificar el valor de numero que esta encima del carrito de navbar
import {carritoCantidadAgregadaNavbar} from './manipulacionNavbar.js';

//variables para la vista si el carrito esta vacio
let carritoVacio = document.querySelector(".carritoVacio");
let carrito = document.querySelector(".carrito");

//Variables para manipular la vista de los productos agregados al carrito
let productosAgregados = document.querySelector(".productosAgregados");
let contenidoCarritoHTML = "";

let indiceListaCompras = 0;

//variables para mostrar el modal de seguro desea eliminar producto
let modalEliminar = document.getElementById("modalEliminarProducto");
let textoModalEliminar = document.getElementById("textoModalEliminar");

//Obtener de local storage la lista de compras si esta creada
if(localStorage.getItem('listaCompras')!=undefined){
    listaCompras = JSON.parse(localStorage.getItem('listaCompras'));
}

//condicional para poner en vista al carrito vacio o al carrito con productos dependiendo del caso
if(listaCompras.length!=0){
    carritoVacio.style.display = "none";
    carrito.style.display = "grid";
    actualizarCarrito();
}else{
    carritoVacio.style.display = "flex";
    carrito.style.display = "none";
}

function actualizarCarrito(){
    productos();
    //resumenDeCompra();
    localStorage.setItem('cantidadListaCompras',listaCompras.length);
    carritoCantidadAgregadaNavbar();
    localStorage.setItem('listaCompras',JSON.stringify(listaCompras));
}


//inicio funcion productos la cual recopila en html los productos a dibujar;
function productos(){
    contenidoCarritoHTML = "<hr>"
    listaCompras.forEach(producto => {
        producto.subtotal = producto.precio * producto.cantidad;
        contenidoCarritoHTML += 
        `<div class="productoCarrito">
            <i class="bi bi-x-circle-fill botonEliminar" onclick = "eliminarProducto(${producto.id})"></i> 
            <div class="productoCarritoImg">
                <img src="${producto.url}" >
            </div>
            <div class="productoCarritoInfo">
                <h5>${producto.nombre}</h5>
                <p> $${producto.subtotal} </p>
                <div class="productoCantidad"> 
                    <div class="cantidad"> 
                        <i class="bi bi-dash-square-fill" onclick = "disminuirProducto(${producto.id})"></i>
                        <input type="number" id="input${producto.id}" name="${producto.id}" value="${producto.cantidad}" required> 
                        <i class="bi bi-plus-square-fill" onclick = "aumentarProducto(${producto.id})"></i>  
                    </div> 
                </div>
                <a href="">ver información</a>
            </div>     
        </div>   
        <hr>`
    });

    productosAgregados.innerHTML = contenidoCarritoHTML;
}
// fin funcion productos


//inicio resumenDeCompra();
function resumenDeCompra(){
contenidoCarritoHTML = ""
}
// fin funcion resumenDeCompra();

function encontrarIndiceListaObjetos(id){
    let index = 0;
    for(let i=0 ;i < listaCompras.length ; i++){
        if(listaCompras[i].id == id){
            index = i;
        }
    }
    return index
}

export function disminuirProducto(id){
    indiceListaCompras = encontrarIndiceListaObjetos(id);
    if(listaCompras[indiceListaCompras].cantidad == 1){
        eliminarProducto(indiceListaCompras);
    }else{
        listaCompras[indiceListaCompras].cantidad -= 1;
        actualizarCarrito();
    }
}
window.disminuirProducto = disminuirProducto;

export function aumentarProducto(id){
    indiceListaCompras = encontrarIndiceListaObjetos(id);
    if(listaCompras[indiceListaCompras].cantidad != 20){
        listaCompras[indiceListaCompras].cantidad += 1;
        actualizarCarrito();
    }
    
}
window.aumentarProducto = aumentarProducto;

//función para eliminar un producto
export function eliminarProducto(id){
    indiceListaCompras = encontrarIndiceListaObjetos(id);
    textoModalEliminar.innerHTML = `<h5> Se eliminara el producto ${listaCompras[indiceListaCompras].nombre} del carrito,¿Esta seguro? </h5>`
    modalEliminar.style.display = "block";
}
window.eliminarProducto = eliminarProducto;

//funcion para cancelar el modal de eliminar producto
export function cancelarEliminar(){
    modalEliminar.style.display = "none";
}
window.cancelarEliminar = cancelarEliminar;

//funcion para eliminar definitivamente el producto del carrito
export function eliminarDefinitivo(){
    listaCompras.splice(indiceListaCompras,1);
    modalEliminar.style.display = "none";
    actualizarCarrito();
    if(listaCompras.length == 0){
        carritoVacio.style.display = "flex";
        carrito.style.display = "none";
    }
}
window.eliminarDefinitivo = eliminarDefinitivo;


document.addEventListener('input',function(event){verificarCantidadNueva(event)});
document.addEventListener('change',function(event){verificarCantidadNueva(event)});

function verificarCantidadNueva(event){ 
    let tipo = event.type;
    let cantidadNueva = event.target.valueAsNumber;
    let idProducto = event.target.name;
    let entradaCantidadPlato = document.getElementById(event.target.id);
    indiceListaCompras = encontrarIndiceListaObjetos(idProducto);
    

    if(cantidadNueva >= 1 && cantidadNueva <=20){
        entradaCantidadPlato.setCustomValidity("",);
        listaCompras[indiceListaCompras].cantidad = cantidadNueva;
    }
    else{
        if(tipo == 'change'){
            listaCompras[indiceListaCompras].cantidad = 1;
        }      
        entradaCantidadPlato.setCustomValidity( "Puedes pedir entre 1 a 20 platos, para mayor cantidad, contactanos",);
    }

    if(tipo == 'change'){
        actualizarCarrito();
    }
    entradaCantidadPlato.reportValidity();
    
}


  
    