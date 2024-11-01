// importamos carritoCantidadAgregada para poder ir modificando el numero ubicado sobre el icono de carrito
import {carritoCantidadAgregadaNavbar} from './manipulacionNavbar.js';

//javascript que realiza las funciones necesarias para traer todos los productos
import * as modificarJSON from "../scripts/scriptModificarJSON.js";

const menu = await modificarJSON.obtenerBaseDatos();
console.log(menu);

// variables que contienen el div de cada categoría de comida
let desayunos = document.querySelector('#desayunos');
let almuerzos = document.querySelector('#almuerzos');
let postres = document.querySelector('#postres');

//variables para almacenar los productos según la categoría e insertar en cada uno de los div respectivos
let desayunosHTML = "";
let almuerzosHTML = "";
let postresHTML = "";

//variable auxiliar para recopilar cada producto individualmente y después almacenarlo a la respectiva variable 
let contenidoMenuHTML = "";

//variables para el modal solicitando realizar un registro 
let modalRealizarRegistro = document.getElementById("modalRealizarRegistro");
let botonCerrarModalRealizarRegistro = document.getElementById("cerrarModalRealizarRegistro");


// variables para el modal de agregando producto al carrito
let modalAgregadoACarrito = document.getElementById("modalAgregadoACarrito");
let mensajeModal = document.getElementById("mensajeModal");
let botonContinuarAgregando = document.getElementById("botonContinuarAgregando");
let botonCerrarModalAgregadoACarrito = document.getElementById("cerrarModalAgregadoACarrito");


let usuario = localStorage.getItem('usuario');

let listaCompras = [];

if (localStorage.getItem('listaCompras') != undefined) {
    listaCompras = JSON.parse(localStorage.getItem('listaCompras'));
}

function productoCarrito(id, nombre, descripcion, categoria, precio, url, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.precio = precio;
    this.url = url;
    this.cantidad = cantidad;
    this.subtotal = this.cantidad * this.precio;
}


function actualizarMenu() {
    menu.forEach(producto => {
        contenidoMenuHTML =
        `
        <div class="producto">
            <div class="contenedorImagenCard"><img src="${producto.url}" alt=""></div>
            <div class="contenedorTituloCard">
            <h5> ${producto.nombre}
            </h5>
            </div>
            <div class="contenedorDescripcionCard">
            <p>${producto.descripcion}</p>
            </div>
            <div class="contenedorPrecioCard">
            <p> <b>$  ${producto.precio.toLocaleString()}  COP</b> </p>
            </div>
            <!-- contenedor boton de la card -->
            <div class="contenedorBotonCard">
                <button class="botonCardMenu" onclick="adicionarCarrito(${producto.id})">
                <i class="bi bi-cart4 iconoBotonCard"></i>
            </button>
            </div>
        </div>
        
        `

        switch (producto.categoria) {
            case 'desayuno':
                desayunosHTML += contenidoMenuHTML;
                break;
            case 'almuerzo':
                almuerzosHTML += contenidoMenuHTML;
                break;
            case 'postre':
                postresHTML += contenidoMenuHTML;
                break;
            default:
                console.log(`categoría incorrecta ${productos.categoria}`);
        }

    });

    desayunos.innerHTML=desayunosHTML;
    almuerzos.innerHTML=almuerzosHTML;
    postres.innerHTML=postresHTML;
    //contenidoMenu.innerHTML = contenidoMenuHTML;
}

actualizarMenu();

// Se exporta la función ya que este javascript se esta llamando como tipo modulo,
//al ser de este tipo las variables y funciones no están de manera global
export function adicionarCarrito(id) {

    if(usuario == "" || usuario == undefined ){
        modalRealizarRegistro.style.display = "flex";
    }else{

        let indiceMenu = 0;
        for (let i = 0; i < menu.length; i++) {
            if (menu[i].id == id) {
                indiceMenu = i;
            }
        }

        if (!encontrarIndiceListaObjetos(id)) {
            listaCompras.push(
                    new productoCarrito(
                        menu[indiceMenu].id,
                        menu[indiceMenu].nombre,
                        menu[indiceMenu].descripcion,
                        menu[indiceMenu].categoria,
                        menu[indiceMenu].precio,
                        menu[indiceMenu].url,
                        1
                    )
                )

            // actualizar numero de productos agregados que se ven sobre el icono de carrito del navbar
            localStorage.setItem('cantidadListaCompras',listaCompras.length);
        
            carritoCantidadAgregadaNavbar();

            localStorage.setItem('listaCompras', JSON.stringify(listaCompras));
            mensajeModal.innerHTML = `<p> El producto  <b>${menu[indiceMenu].nombre} </b> ha sido agregado al carrito. </p>`;
        } else {
            mensajeModal.innerHTML = `<p> El producto  <b>${menu[indiceMenu].nombre} </b> ya se ha agregado al carrito. </p>`;
        }

        modalAgregadoACarrito.style.display = "flex";
    }
}

//ya declarada la función para exportar, con la siguiente linea la ponemos de manera global en html
window.adicionarCarrito = adicionarCarrito;

function encontrarIndiceListaObjetos(id) {
    let index = false;
    for (let i = 0; i < listaCompras.length; i++) {
        if (listaCompras[i].id == id) {
            index = true;
        }
    }
    return index
}

function cerrarModalAgregadoACarrito(){
    modalAgregadoACarrito.style.display = "none";
}

botonCerrarModalAgregadoACarrito.addEventListener('click', cerrarModalAgregadoACarrito);
botonContinuarAgregando.addEventListener('click', cerrarModalAgregadoACarrito);


botonCerrarModalRealizarRegistro.addEventListener('click',()=>{modalRealizarRegistro.style.display = "none"});



