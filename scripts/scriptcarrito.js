//let idProductosCarrito = [];
let listaCompras = [];


if(localStorage.getItem('listaCompras')!=undefined){
    listaCompras = JSON.parse(localStorage.getItem('listaCompras'));
}

let productosAgregados = document.querySelector(".productosAgregados");
let contenidoCarritoHTML = "";


function actualizarCarrito(){
    contenidoCarritoHTML = ""
    listaCompras.forEach(producto => {
        producto.subtotal = producto.precio * producto.cantidad;
        contenidoCarritoHTML += 
        `<div class="producto">
            <i class="bi bi-trash-fill botonEliminar" onclick = "eliminarProducto(${producto.id})"></i>
            <img src="${producto.url}" alt="">
            <p> ${producto.nombre} </p>
            <div class="productoCantidad"> 
                <div class="cantidad"> 
                    <i class="bi bi-dash-circle-fill" onclick = "disminuirProducto(${producto.id})"></i>
                    <input type="number" value="${producto.cantidad}"> 
                    <i class="bi bi-plus-circle-fill" onclick = "aumentarProducto(${producto.id})"></i>  
                </div> 
            </div>
            <p> <span>und:</span> $${producto.precio} </p>
            <p> <span>subtotal:</span> $${producto.subtotal} </p>
        </div> `
    });

    productosAgregados.innerHTML = contenidoCarritoHTML;

    // localStorage.setItem('idProducto',JSON.stringify(idProductosCarrito));
    localStorage.setItem('listaCompras',JSON.stringify(listaCompras));
}
actualizarCarrito();

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
    let indiceListaCompras = encontrarIndiceListaObjetos(id);
    if(listaCompras[indiceListaCompras].cantidad == 1){
        eliminarProducto(indiceListaCompras);
    }else{
        listaCompras[indiceListaCompras].cantidad -= 1;
    }
    actualizarCarrito();
}

function aumentarProducto(id){
    let indiceListaCompras = encontrarIndiceListaObjetos(id);
    listaCompras[indiceListaCompras].cantidad += 1;
    actualizarCarrito();
}


//función para eliminar un producto
function eliminarProducto(id){
    let indiceListaCompras = encontrarIndiceListaObjetos(id);
    alert( ` Se eliminara el producto ${listaCompras[indiceListaCompras].nombre}, esta seguro` );
    listaCompras.splice(indiceListaCompras,1);
    actualizarCarrito();
}