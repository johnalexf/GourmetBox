//import menu from './jsonproductos.json' with {type: 'json'};
//let url = "http://localhost:3000/productos";  //Variable para usar con un servidor local ACTIVADO
let url = "../scripts/jsonproductos.json"; //Variable para solo acceder a los datos del JSON


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

let contenidoMenu = document.querySelectorAll('.contenidoMenu');
let desayunos = document.querySelector('.desayunos');
let almuerzos = document.querySelector('.almuerzos');
let postres = document.querySelector('.postres');
let desayunosHTML = "";
let almuerzosHTML = "";
let postresHTML = "";
let contenidoMenuHTML = "";

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
            `<div class="producto">
                <div class="contenedorImagenCard">
                <img src="${producto.url}" alt="">
                </div>

                <div class="contenedorTituloCard">
                <h5> <b>${producto.nombre} </b> </h5>
                </div>
                
                <div class="contenedorDescripcionCard"><p> ${producto.descripcion} </p></div>
                <div class="contenedorPrecioCard"><p> <b> ${producto.precio} </b> </p></div>
                <div class="contenedorBotonCard">
                <button class="botonCardMenu" onclick="adicionarCarrito(${producto.id})">
                    <i class="bi bi-cart-plus iconoBotonCard"></i>
                </button>
                </div>
        </div>`

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
        
        localStorage.setItem('listaCompras', JSON.stringify(listaCompras));
        alert(`El producto ${menu[indiceMenu].nombre} ha sido agregado al carrito`);
    } else {
        alert("El producto ya se ha agregado al carrito");
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

