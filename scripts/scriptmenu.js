import {carritoCantidadAgregadaNavbar} from './manipulacionNavbar.js';


//let url = "../scripts/baseDatos.json"; //Variable para solo acceder a los datos del JSON
//url para poder hacer pruebas con live server y que este no recargue la pagina al cambiar el json
let url = "http://localhost:3000/productos";  //Variable para usar con un servidor local ACTIVADO

let menu;
async function obtenerMenu() {
    try {
        // Realiza una solicitud fetch para obtener el JSON
        const respuesta = await fetch(url);

        // Verifica si la solicitud fue exitosa
        if (!respuesta.ok) {
            throw new Error('Error al obtener el JSON');
        }

        // Convierte la respuesta a un objeto JavaScript
        const datos = await respuesta.json();

        if (url == "http://localhost:3000/productos") {
            return datos;
        } else {
            return datos.productos;
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

menu = await obtenerMenu();
console.log(menu);

let desayunos = document.querySelector('#desayunos');
let almuerzos = document.querySelector('#almuerzos');
let postres = document.querySelector('#postres');
let desayunosHTML = "";
let almuerzosHTML = "";
let postresHTML = "";
let contenidoMenuHTML = "";

let modalAgregadoACarrito = document.getElementById("modalAgregadoACarrito");
let mensajeModal = document.getElementById("mensajeModal");

let botonContinuarAgregando = document.getElementById("botonContinuarAgregando");
let botonCerrarModalAgregadoACarrito = document.getElementById("cerrarModalAgregadoACarrito");


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


let listaCompras = [];

if (localStorage.getItem('listaCompras') != undefined) {
    listaCompras = JSON.parse(localStorage.getItem('listaCompras'));
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
            <p> <b>$  ${producto.precio}  COP</b> </p>
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
        mensajeModal.innerHTML = `<h5> El producto  <b>${menu[indiceMenu].nombre} </b> ha sido agregado al carrito. </h5>`;
    } else {
        mensajeModal.innerHTML = `<h5> El producto  <b>${menu[indiceMenu].nombre} </b> ya se ha agregado al carrito. </h5>`;
    }

    modalAgregadoACarrito.style.display = "block";
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




