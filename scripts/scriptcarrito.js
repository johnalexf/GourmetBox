//let idProductosCarrito = []; 
let listaCompras = [];

//Obtener de local storage la lista de compras si esta creada
if(localStorage.getItem('listaCompras')!=undefined){
    listaCompras = JSON.parse(localStorage.getItem('listaCompras'));
}

console.log(listaCompras[0].subtotal);
let productosAgregados = document.querySelector(".productosAgregados");
let contenidoCarritoHTML = "";

let indiceListaCompras = 0;

let modalEliminar = document.getElementById("modalEliminarProducto");
let textoModalEliminar = document.getElementById("textoModalEliminar");


function actualizarCarrito(){
    
    productos();
    //resumenDeCompra();

    // localStorage.setItem('idProducto',JSON.stringify(idProductosCarrito));
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
                        <input type="number" value="${producto.cantidad}"> 
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

actualizarCarrito();

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

function disminuirProducto(id){
    indiceListaCompras = encontrarIndiceListaObjetos(id);
    if(listaCompras[indiceListaCompras].cantidad == 1){
        eliminarProducto(indiceListaCompras);
    }else{
        listaCompras[indiceListaCompras].cantidad -= 1;
    }
    actualizarCarrito();
}

function aumentarProducto(id){
    indiceListaCompras = encontrarIndiceListaObjetos(id);
    listaCompras[indiceListaCompras].cantidad += 1;
    actualizarCarrito();
}


//función para eliminar un producto
function eliminarProducto(id){
    indiceListaCompras = encontrarIndiceListaObjetos(id);
    textoModalEliminar.innerHTML = `<h5> Se eliminara el producto ${listaCompras[indiceListaCompras].nombre} del carrito,¿Esta seguro? </h5>`
    modalEliminar.style.display = "block";
}

function cancelarEliminar(){
    modalEliminar.style.display = "none";
}

function eliminarDefinitivo(){
    listaCompras.splice(indiceListaCompras,1);
    actualizarCarrito();
    modalEliminar.style.display = "none";
}