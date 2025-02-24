let listaCompras = [];

//importación de la funcion que permite modificar el valor de numero que esta encima del carrito de navbar
import { carritoCantidadAgregadaNavbar } from './manipulacionNavbar.js';

//variables para la vista si el carrito esta vació
let carritoVacio = document.querySelector(".carritoVacio");
let carrito = document.querySelector(".carrito");

//Variables para manipular la vista de los productos agregados al carrito
let productosAgregados = document.querySelector(".productosAgregados");
let contenidoCarritoHTML = "";

let indiceListaCompras = 0;

//variables para mostrar el modal de seguro desea eliminar producto
let modalEliminar = document.getElementById("modalEliminarProducto");
let productoAEliminar = document.getElementById("productoAEliminar");

let producto = document.querySelector("#producto");
let modalVistaProducto = document.getElementById("modalVistaProducto");
let botonCerrarVistaProducto = document.getElementById("cerrarVistaProducto");

//Obtener de local storage la lista de compras si esta creada
if (localStorage.getItem('listaCompras')) {
    listaCompras = JSON.parse(localStorage.getItem('listaCompras'));
}

//variable para verificar si hay un usuario registrado
let usuario = localStorage.getItem('usuario');

//condicional para poner en vista al carrito vació o al carrito con productos dependiendo del caso
function inicializarVista(){
    if(usuario != "" && usuario){
        if (listaCompras.length != 0) {
            carritoVacio.style.display = "none";
            carrito.style.display = "flex";
            actualizarCarrito();
        } else {
            carritoVacio.style.display = "flex";
            carrito.style.display = "none";
        }
    }
}

inicializarVista();

function actualizarCarrito() {
    productos();
    resumenDeCompra();
    localStorage.setItem('cantidadListaCompras', listaCompras.length);
    carritoCantidadAgregadaNavbar();
    localStorage.setItem('listaCompras', JSON.stringify(listaCompras));
}


//inicio funcion productos la cual recopila en html los productos a dibujar;
function productos() {
    contenidoCarritoHTML = "<hr>"
    listaCompras.forEach(producto => {
        producto.subtotal = producto.precio * producto.cantidad;
        contenidoCarritoHTML +=
        `<div class="productoCarrito">
            <i class="bi bi-x-circle-fill botonEliminar" onclick = "eliminarProducto(${producto.id})"></i> 
            <img src="${producto.url}" >
            <div class="productoCarritoInfo">
                <h5>${producto.nombre}</h5>
                <p> $${producto.subtotal.toLocaleString('es-CO')} </p>
                <div class="productoCantidad"> 
                    <div class="cantidad"> 
                        <i class="bi bi-dash-square-fill" onclick = "disminuirProducto(${producto.id})"></i>
                        <input type="number" id="input${producto.id}" name="${producto.id}" value="${producto.cantidad}" required> 
                        <i class="bi bi-plus-square-fill" onclick = "aumentarProducto(${producto.id})"></i>  
                    </div> 
                </div>
            </div> 
            <p class="verInformacion" onclick="mostrarProducto(${producto.id})">ver información</p>      
        </div>
        <hr>`
    });

    productosAgregados.innerHTML = contenidoCarritoHTML;
}
// fin funcion productos

//funcion para mostrar la información del producto con el párrafo (ver información) de cada producto agregado
export function mostrarProducto(id) {
    indiceListaCompras = encontrarIndiceListaObjetos(id);
    producto.innerHTML =
        ` <div class="contenedorImagenCard">
                <img src="${listaCompras[indiceListaCompras].url}" alt="">
            </div>
        
            <div class="contenedorTituloCard">
                <h5>${listaCompras[indiceListaCompras].nombre}
                </h5>
            </div>
        
            <div class="contenedorDescripcionCard">
                <p>${listaCompras[indiceListaCompras].descripcion}</p>
            </div>
            
            <div class="contenedorPrecioCard"></div>
                <p> <b>$  ${parseInt(listaCompras[indiceListaCompras].precio).toLocaleString('es-CO')}  COP</b> </p>
            </div>
            `
            modalVistaProducto.style.display = "flex";
}
window.mostrarProducto = mostrarProducto;

botonCerrarVistaProducto.addEventListener('click' , ()=>{           
    modalVistaProducto.style.display = "none"
});

//inicio resumenDeCompra();
function resumenDeCompra() {
    let totalProductos = 0;
    let subtotalProductos = 0;
    let totalPagar = 0;
    const costoDomicilio = 12000; // Definimos el costo del domicilio de forma explícita
    let resumenHTML = "";

    listaCompras.forEach(producto => {
        subtotalProductos += producto.subtotal; // Suma de los subtotales de los productos
        totalProductos += producto.cantidad; // Suma de las cantidades de productos
        
        resumenHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.subtotal.toLocaleString('es-CO')}</td>
            </tr>
        `;
        
    });

    totalPagar = subtotalProductos + costoDomicilio; // Calcula el total a pagar sumando el domicilio

    // Actualizamos el HTML
    document.getElementById("resumenItems").innerHTML = resumenHTML;
    document.getElementById("totalProductos").innerText = `$${subtotalProductos.toLocaleString('es-CO')}`;
    document.getElementById("totalPagar").innerText = `$${totalPagar.toLocaleString('es-CO')}`;

}
// fin funcion resumenDeCompra();

//funcion para encontrar el indice en la lista de compras donde esta ubicado el producto a buscar
function encontrarIndiceListaObjetos(id) {
    let index = 0;
    for (let i = 0; i < listaCompras.length; i++) {
        if (listaCompras[i].id == id) {
            index = i;
        }
    }
    return index
}

//funcion para disminuir la cantidad del producto con el botón de menos
export function disminuirProducto(id) {
    indiceListaCompras = encontrarIndiceListaObjetos(id);
    if (listaCompras[indiceListaCompras].cantidad == 1) {
        eliminarProducto(id);
    } else {
        listaCompras[indiceListaCompras].cantidad -= 1;
        actualizarCarrito();
    }
}
window.disminuirProducto = disminuirProducto;

//funcion para aumentar la cantidad del producto con el botón de mas
export function aumentarProducto(id) {
    indiceListaCompras = encontrarIndiceListaObjetos(id);
    if (listaCompras[indiceListaCompras].cantidad != 20) {
        listaCompras[indiceListaCompras].cantidad += 1;
        actualizarCarrito();
    }

}
window.aumentarProducto = aumentarProducto;


//función para eliminar un producto la cual abre un modal para confirmar antes de eliminar
export function eliminarProducto(id) {
    indiceListaCompras = encontrarIndiceListaObjetos(id);
    productoAEliminar.innerText = `${listaCompras[indiceListaCompras].nombre}`
    modalEliminar.style.display = "flex";
}
window.eliminarProducto = eliminarProducto;


//funcion para cancelar el modal de eliminar producto
export function cancelarEliminar() {
    modalEliminar.style.display = "none";
}
window.cancelarEliminar = cancelarEliminar;


//funcion para eliminar definitivamente el producto del carrito
export function eliminarDefinitivo() {
    listaCompras.splice(indiceListaCompras, 1);
    modalEliminar.style.display = "none";
    actualizarCarrito();
    if (listaCompras.length == 0) {
        carritoVacio.style.display = "flex";
        carrito.style.display = "none";
    }
}
window.eliminarDefinitivo = eliminarDefinitivo;

//funcion para verificar si el usuario escribió una cantidad de platos en el input y actualizar el valor en lista de compras
function verificarCantidadNueva(event) {
    let tipo = event.type;
    let cantidadNueva = event.target.valueAsNumber;
    let idProducto = event.target.name;
    let entradaCantidadPlato = document.getElementById(event.target.id);
    indiceListaCompras = encontrarIndiceListaObjetos(idProducto);


    if (cantidadNueva >= 1 && cantidadNueva <= 20) {
        entradaCantidadPlato.setCustomValidity("",);
        listaCompras[indiceListaCompras].cantidad = cantidadNueva;
    }
    else {
        if (tipo == 'change') {
            listaCompras[indiceListaCompras].cantidad = 1;
        }
        entradaCantidadPlato.setCustomValidity("Puedes pedir entre 1 a 20 platos, para mayor cantidad, contactanos",);
    }

    if (tipo == 'change') {
        actualizarCarrito();
    }
    entradaCantidadPlato.reportValidity();

}


//modal pago
document.addEventListener('input', function (event) {
    if (!event.target.closest('.modalPago')) {
        verificarCantidadNueva(event);
    }
});

document.addEventListener('change', function (event) {
    if (!event.target.closest('.modalPago')) {
        verificarCantidadNueva(event);
    }
});

const btnPagarCarrito = document.getElementById("botonPagar");
btnPagarCarrito.addEventListener("click", () => {
    
    const costo = document.getElementById("costo");
    const total = document.getElementById("totalPagar");
    costo.value = `     ${total.textContent}`;
    
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
const brand = document.getElementById("brand");

inputNumber.addEventListener("input", () => {

    if (inputNumber.value[0]==="4") {
        brand.src = "../img/visa.png";
    }else if (inputNumber.value[0]==="5") {
        brand.src = "../img/master.png"; 
        } else {
            brand.src = "../img/visa.png";
        }

    if ((/[^0-9\s]/).test(inputNumber.value)) {
        inputNumber.setCustomValidity("Solo se permiten números y espacios");
    } else {
        numberTC.textContent = inputNumber.value;
        inputNumber.setCustomValidity("");
    }

    inputNumber.reportValidity();    
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

    frente.style.visibility = "hidden";
    frente.style.opacity = "0";

    atras.style.visibility = "visible";
    atras.style.opacity = "1";

});

cvv.addEventListener("mouseout", () => {
    const frente = document.getElementById("frente");
    const atras = document.getElementById("atras");

    atras.style.visibility = "hidden";
    atras.style.opacity = "0";

    frente.style.visibility = "visible";
    frente.style.opacity = "1";    
});


cvv.addEventListener("input", () => {
    const cvvP = document.getElementById("lineaBlanca");
    cvvP.textContent = cvv.value;
});


const cerrar = document.querySelector(".cerrarTerminos");

cerrar.addEventListener("click", () => {
    const modalPago = document.querySelector(".contenedorPago");
    modalPago.style.display = "none";
});

const btnPago = document.getElementById("realizarPago");

btnPago.addEventListener("click", () => {
    
    if(cvv.value != "" && inputNumber.value != "" && inputNombre.value != "" && expiraDate.value != ""){
        swal("Pago Recibido!", "Bienvenido a la Familia GBox!", "success");
        const modalPago = document.querySelector(".contenedorPago");
        modalPago.style.display = "none";
        listaCompras.length=0;
        localStorage.removeItem('listaCompras');
        localStorage.setItem('cantidadListaCompras', listaCompras.length);
        carritoCantidadAgregadaNavbar();
        inicializarVista();

    }else{
        swal("Debes Verificar!", "Asegúrate de Ingresar los Datos de tu Tarjeta Correctamente", "warning");
    }
});