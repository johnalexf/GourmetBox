import menu from './jsonproductos.json' with {type: 'json'};

let contenidoMenu = document.querySelector('.contenidoMenu');
let contenidoMenuHTML = "";

function productoCarrito(id,nombre,descripcion,categoria,precio,url,cantidad){
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.precio = precio;
    this.url = url;
    this.cantidad = cantidad;
    this.subtotal = this.cantidad*this.precio;
}


let listaCompras = [];

if(localStorage.getItem('listaCompras')!=undefined){
    listaCompras = JSON.parse(localStorage.getItem('listaCompras'));
}

function actualizarMenu(){
    menu.forEach(producto => {
        contenidoMenuHTML += 
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
    });

    contenidoMenu.innerHTML = contenidoMenuHTML;
}

actualizarMenu();

// Se exporta la función ya que este javascript se esta llamando como tipo modulo,
//al ser de este tipo las variables y funciones no están de manera global
export function adicionarCarrito(id){
    if(!encontrarIndiceListaObjetos(id)){
        listaCompras.push(
            new productoCarrito(
                menu[id-1].id,
                menu[id-1].nombre,
                menu[id-1].descripcion,
                menu[id-1].categoria,
                menu[id-1].precio,
                menu[id-1].url,
                1
            )
        );
        localStorage.setItem('listaCompras',JSON.stringify(listaCompras));
        alert(`El producto ${menu[id-1].nombre} ha sido agregado al carrito`);
    }else{
        alert("El producto ya se ha agregado al carrito");
    }
    
}

//ya declarada la función para exportar, con la siguiente linea la ponemos de manera global en html
window.adicionarCarrito = adicionarCarrito;

function encontrarIndiceListaObjetos(id){
    let index = false;
    for(let i=0 ;i < listaCompras.length ; i++){
        if(listaCompras[i].id == id){
            index = true;
        }
    }
    return index
}

