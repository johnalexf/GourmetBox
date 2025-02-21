// importamos carritoCantidadAgregada para poder ir modificando el numero ubicado sobre el icono de carrito
import {carritoCantidadAgregadaNavbar} from './manipulacionNavbar.js';

//javascript que realiza las funciones necesarias para traer todos los productos
import * as bd from "../scripts/scriptBD.js";

let menu;

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
            <div class="contenedorImagenCard"><img src="${producto.img_producto}" alt=""></div>
            <div class="contenedorTituloCard">
            <h5> ${producto.nombre_producto}
            </h5>
            </div>
            <div class="contenedorDescripcionCard">
            <p>${producto.descripcion_producto}</p>
            </div>
            <div class="contenedorPrecioCard">
            <p> <b>$  ${producto.precio_producto.toLocaleString()}  COP</b> </p>
            </div>
            <!-- contenedor boton de la card -->
            <div class="contenedorBotonCard">
                <button class="botonCardMenu" onclick="adicionarCarrito(${producto.id_producto})">
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
                console.log(`categoría incorrecta ${producto.categoria}`);
        }

    });

    desayunos.innerHTML=desayunosHTML;
    almuerzos.innerHTML=almuerzosHTML;
    postres.innerHTML=postresHTML;
    desayunos.classList.add('contenidoMenu');
    almuerzos.classList.add('contenidoMenu');
    postres.classList.add('contenidoMenu');
    //contenidoMenu.innerHTML = contenidoMenuHTML;
}

async function usarMenu() {
    menu = await bd.obtenerBaseDatos(); // Espera a que se resuelva la promesa
    if(menu){
        actualizarMenu();
    }else{
        console.log("Error al obtener los datos, falla de comunicación con el servidor");
        Swal.fire({
            icon: 'error',
            title: '¡Lo sentimos!',
            text: 'En estos momentos no podemos comunicarnos con el servidor. Inténtalo de nuevo más tarde.',
            confirmButtonText: 'Aceptar'
          });
    }
}

usarMenu();

// Se exporta la función ya que este javascript se esta llamando como tipo modulo,
//al ser de este tipo las variables y funciones no están de manera global
// id representa el id del producto a agregar
export function adicionarCarrito(id) {

    //si el usuario no esta registrado muestra el modal del realizar el ingreso
    if(usuario == "" || usuario == undefined ){
        modalRealizarRegistro.style.display = "flex";
    }else{

        //preguntar en el menu donde esta la posición del producto
        let indiceMenu = 0;
        for (let i = 0; i < menu.length; i++) {
            if (menu[i].id_producto == id) {
                indiceMenu = i;
            }
        }


        if (!encontrarIndiceListaObjetos(id)) {
            listaCompras.push(
                    new productoCarrito(
                        menu[indiceMenu].id_producto,
                        menu[indiceMenu].nombre_producto,
                        menu[indiceMenu].descripcion_producto,
                        menu[indiceMenu].categoria,
                        menu[indiceMenu].precio_producto,
                        menu[indiceMenu].img_producto,
                        1 //cantidad inicial en el carrito
                    )
                )

            // actualizar numero de productos agregados que se ven sobre el icono de carrito del navbar
            localStorage.setItem('cantidadListaCompras',listaCompras.length);
        
            carritoCantidadAgregadaNavbar();

            localStorage.setItem('listaCompras', JSON.stringify(listaCompras));
            mensajeModal.innerHTML = `El producto  <b>${menu[indiceMenu].nombre_producto} </b> ha sido agregado al carrito.`;
        } else {
            mensajeModal.innerHTML = `El producto  <b>${menu[indiceMenu].nombre_producto} </b> ya se ha agregado al carrito. `;
        }

        modalAgregadoACarrito.style.display = "flex";
    }
}

//ya declarada la función para exportar, con la siguiente linea la ponemos de manera global en html
window.adicionarCarrito = adicionarCarrito;

//funcion para determinar si el producto ya ha sido agregado a la lista de compras
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



