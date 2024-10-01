//javascript que realiza las funciones necesarias para eliminar o modificar un producto
import * as modificarJSON from "../scripts/scriptModificarJSON.js";

// variable para almacenar modificaciones que se van a insertar en HTML
let html = "";

//variable que contiene el formulario y después se obtienen todos los inputs para modificar su contenido interno
//dependiendo del select escogido, ademas también se usan para guardar un nuevo producto dependiendo del caso
let modificarCrearProducto = document.getElementById('modificarCrearProducto');
let inputsProducto = modificarCrearProducto.querySelectorAll('input');
let labelProducto = modificarCrearProducto.querySelectorAll('label');
let indiceSeleccionado = 1;
// variable que contiene el Select de productos disponibles del formulario
let productosDisponibles = document.getElementById('productosDisponibles');
//variable que contiene el select de categoría de producto
let categoriaProducto = document.getElementById('categoriaProducto');

//variables para mostrar ventana emergente con una vista previa del producto seleccionado o el nuevo creado.
let divProducto = document.querySelector('.producto');
let modalVistaPrevia = document.getElementById('modalVistaPrevia');
let botonVistaPrevia = document.getElementById('botonVistaPreviaProducto');
let cerrarVistaPrevia = document.getElementById('cerrarVistaPrevia');

//variables para cada uno de los botones de modificar o crear producto
let botonCargarProducto = document.getElementById('botonCargarProducto');
let botonModificarProducto = document.getElementById('botonModificarProducto');
let botonCancelarProducto = document.getElementById('botonCancelarProducto');
let botonNuevoProducto = document.getElementById('botonNuevoProducto');
let botonEliminarProducto = document.getElementById('botonEliminarProducto');
let reescribirProducto = false;




//función para cargar la información del producto seleccionado en cada uno de sus correspondientes input
async function mostrarProducto() {
   
            let baseDatos ;
            baseDatos = await modificarJSON.obtenerBaseDatos();
            console.log(baseDatos)
            html = "";
            let productos = baseDatos.productos;
            //console.log(productos)
            productos.forEach(element => {
                html +=  `<option value="${element.id}">${element.nombre}</option>` ;
                if(element.id == indiceSeleccionado){
                    inputsProducto[0].value = element.id;
                    inputsProducto[1].value = element.nombre;
                    inputsProducto[2].value = element.descripcion;
                    categoriaProducto.value = element.categoria;
                    inputsProducto[3].value = element.precio;
                    inputsProducto[4].value = element.url;  
                }
            });
            productosDisponibles.innerHTML = html;
            if(indiceSeleccionado !=0){
                productosDisponibles.value = indiceSeleccionado;
            }
                          
       
}

//se llama para que cuando el usuario ingrese por primera vez, se muestre el contenido del primer producto
mostrarProducto();

//si hay un cambio en el select de productosDisponibles, se actualiza el contenido del formulario
productosDisponibles.addEventListener('change', ()=>{
    indiceSeleccionado = productosDisponibles.value;
     mostrarProducto();
})


//Cuando el usuario oprima en vista previa, se actualiza el contenido de divProducto dentro del modal y se muestra
botonVistaPrevia.addEventListener('click', () => {
    html = "";
    html =  `<div class="contenedorImagenCard"><img src="${inputsProducto[4].value}" alt=""></div>
            <div class="contenedorTituloCard">
            <h5> <b>${inputsProducto[1].value} </b> </h5>
            </div>
            <div class="contenedorDescripcionCard"><p>${inputsProducto[2].value}</p></div>
            <div class="contenedorPrecioCard"><p> <b>Precio ${inputsProducto[3].value}</b> </p></div>
            <div class="contenedorBotonCard">
              <button class="botonCardMenu"><i class="bi bi-cart-plus iconoBotonCard"></i></button>
             </div>
             `;
    divProducto.innerHTML = html;
    modalVistaPrevia.style.display = 'block';
})

//funcion llamada con el botón de cerrar de vista previa del producto
cerrarVistaPrevia.addEventListener('click', ()=>{ modalVistaPrevia.style.display = 'none';});

function cambioEditarProducto(){
    inputsProducto.forEach(element => element.disabled = false);
    inputsProducto[0].disabled = true;
    categoriaProducto.disabled = false;
    
    //label y input de titulo de producto
    labelProducto[1].style.display = "block"; 
    inputsProducto[1].style.display = "block";

    //label y select de titulo de producto
    labelProducto[2].style.display = "none";
    productosDisponibles.style.display = "none";

    botonCargarProducto.style.display = "block";
    botonModificarProducto.style.display = 'none';
    botonCancelarProducto.style.display = 'block';
    botonNuevoProducto.style.display = 'none';
    botonEliminarProducto.style.display = 'block';
}

function cambioMostrarProducto(){
    inputsProducto.forEach(element => element.disabled = true);
    categoriaProducto.disabled = true;
   
    //label y input de titulo de producto
    labelProducto[1].style.display = "none"; 
    inputsProducto[1].style.display = "none";

    //label y select de titulo de producto
    labelProducto[2].style.display = "block";
    productosDisponibles.style.display = "block";


    botonCargarProducto.style.display = "none";
    botonModificarProducto.style.display = 'block';
    botonCancelarProducto.style.display = 'none';
    botonNuevoProducto.style.display = 'block';
    botonEliminarProducto.style.display = 'none';
}

botonModificarProducto.addEventListener('click', ()=>{
    reescribirProducto = true;
    cambioEditarProducto();
})

botonNuevoProducto.addEventListener('click',()=>{
    reescribirProducto = false;
    inputsProducto.forEach((cajaTexto)=>{
        cajaTexto.value = "";
    })
    inputsProducto[0].value = productosDisponibles.options.length + 1;
    inputsProducto[5].value = "Cargar";
    cambioEditarProducto();
})

botonCancelarProducto.addEventListener('click', ()=>{
    indiceSeleccionado = productosDisponibles.value-1;
    cargarProducto();
    cambioMostrarProducto();
})

botonEliminarProducto.addEventListener('click', ()=>{
    modificarJSON.eliminarProducto(inputsProducto[0].value);
    cambioMostrarProducto();
})


modificarCrearProducto.addEventListener('submit', (event)=>{
    event.preventDefault();
    //reescribirOCrearProducto(id,nombre,descripción,categoria,precio,urlImg,Reescribir)
    modificarJSON.reescribirOCrearProducto(
        inputsProducto[0].value,
        inputsProducto[1].value,
        inputsProducto[2].value,
        categoriaProducto.value,
        inputsProducto[3].value,
        inputsProducto[4].value,
        reescribirProducto
       )
});