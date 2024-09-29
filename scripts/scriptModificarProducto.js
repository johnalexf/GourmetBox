// variable para almacenar modificaciones que se van a insertar en HTML
let html = "";

//variable que contiene el formulario y después se obtienen todos los inputs para modificar su contenido interno
//dependiendo del select escogido, ademas también se usan para guardar un nuevo producto dependiendo del caso
let modificarCrearProducto = document.getElementById('modificarCrearProducto');
let inputsProducto = modificarCrearProducto.querySelectorAll('input');
let labelProducto = modificarCrearProducto.querySelectorAll('label');
let indiceSeleccionado = 0;
// variable que contiene el Select de productos disponibles del formulario
let productosDisponibles = document.getElementById('productosDisponibles');
//variable que contiene el select de categoría de producto
let categoriaProducto = document.getElementById('categoriaProducto');

//variables para mostrar ventana emergente con una vista previa del producto seleccionado o el nuevo creado.
let divProducto = document.querySelector('.producto');
let modalVistaPrevia = document.getElementById('modalVistaPrevia');
let botonVistaPrevia = document.getElementById('botonVistaPreviaProducto');

//variables para cada uno de los botones de modificar o crear producto
let botonCargarProducto = document.getElementById('botonCargarProducto');
let botonModificarProducto = document.getElementById('botonModificarProducto');
let botonCancelarProducto = document.getElementById('botonCancelarProducto');
let botonCrearProducto = document.getElementById('botonCrearProducto');
let botonEliminarProducto = document.getElementById('botonEliminarProducto');


//función para cargar la información del producto seleccionado en cada uno de sus correspondientes input
function cargarProducto() {
    fetch('../scripts/jsonproductos.json')
        //el primer .then espera una respuesta positiva y devuelve en este caso un .json para usarlo en el siguiente .then
        .then((respuesta)=>{ 
            return respuesta.json();
        })
        .then((productos)=>{
            html = "";
            productos.forEach(element => {
                html +=  `<option value="${element.id}">${element.nombre}</option>` 
            });
            productosDisponibles.innerHTML = html;
            productosDisponibles.value = indiceSeleccionado + 1;
            inputsProducto[0].value=productos[indiceSeleccionado].id;
            inputsProducto[1].value=productos[indiceSeleccionado].nombre;
            inputsProducto[2].value=productos[indiceSeleccionado].descripcion;
            categoriaProducto.value = productos[indiceSeleccionado].categoria;
            inputsProducto[3].value=productos[indiceSeleccionado].precio;
            inputsProducto[4].value=productos[indiceSeleccionado].url;            
        })


}

//se llama para que cuando el usuario ingrese por primera vez, se muestre el contenido del primer producto
cargarProducto();

//si hay un cambio en el select de productosDisponibles, se actualiza el contenido del formulario
productosDisponibles.addEventListener('change', ()=>{
    indiceSeleccionado = productosDisponibles.value-1;
    cargarProducto();
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
function cerrarVistaPrevia(){
    modalVistaPrevia.style.display = 'none';
}

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
    botonCrearProducto.style.display = 'none';
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
    botonCrearProducto.style.display = 'block';
    botonEliminarProducto.style.display = 'none';
}

botonModificarProducto.addEventListener('click', ()=>{
    cambioEditarProducto();
})

botonCrearProducto.addEventListener('click',()=>{
    cambioEditarProducto();
})

botonCancelarProducto.addEventListener('click', ()=>{
    cambioMostrarProducto();
})

botonEliminarProducto.addEventListener('click', ()=>{
    cambioMostrarProducto();
})