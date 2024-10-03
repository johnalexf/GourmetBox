//javascript que realiza las funciones necesarias para eliminar o modificar un producto
import * as modificarJSON from "../scripts/scriptModificarJSON.js";

// variable para almacenar modificaciones que se van a insertar en HTML
let html = "";

//variable que contiene el formulario y después se obtienen todos los inputs para modificar su contenido interno
//dependiendo del select escogido, ademas también se usan para guardar un nuevo producto dependiendo del caso
let pNombreUrlImagen = document.getElementById('nombreUrlImagen');
let formularioModificarCrearProducto = document.getElementById('modificarCrearProducto');
let inputsProducto = formularioModificarCrearProducto.querySelectorAll('input');
let labelProducto = formularioModificarCrearProducto.querySelectorAll('label');
let indiceSeleccionado = 1;
// variable que contiene el Select de productos disponibles del formulario
let productosDisponibles = document.getElementById('productosDisponibles');
//variable que contiene el select de categoría de producto
let categoriaProducto = document.getElementById('categoriaProducto');

//variables para mostrar ventana emergente con una vista previa del producto seleccionado o el nuevo creado y aceptar o cancelar cambios
let botonCancelarCambios = document.getElementById('cancelarCambios');
let botonAceptarCambios = document.getElementById('aceptarCambios');
let divProducto = document.querySelector('.producto');
let modalVistaPrevia = document.getElementById('modalVistaPrevia');

//let botonVistaPrevia = document.getElementById('botonVistaPreviaProducto');
let cerrarVistaPrevia = document.getElementById('cerrarVistaPrevia');

//variables para cada uno de los botones de modificar o crear producto
let divUrlProducto = document.querySelector('.divUrlProducto');
let divBotonCargar = document.getElementById('divBotonCargar');
let botonModificarProducto = document.getElementById('botonModificarProducto');
let botonCancelarEdicionProducto = document.getElementById('botonCancelarEdicionProducto');
let botonNuevoProducto = document.getElementById('botonNuevoProducto');
let botonEliminarProducto = document.getElementById('botonEliminarProducto');
let reescribirProducto = false;

//variables para el modal de eliminar producto
let modalEliminarProducto = document.getElementById('modalEliminarProducto');

//variable para guardar la imagen de forma de texto
let imagen;


//función para cargar la información del producto seleccionado en cada uno de sus correspondientes input
async function mostrarProductoEnFormulario() {
   
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
                    pNombreUrlImagen.textContent = "imagen.png";
                    imagen = element.url;
                    //console.log(imagen); 
                    //console.log(typeof(imagen))
                    //console.log(imagen.length);
                }
            });
            productosDisponibles.innerHTML = html;
            if(indiceSeleccionado !=0){
                productosDisponibles.value = indiceSeleccionado;
            }
            inputsProducto[4].required = false; 
                          
       
}

//se llama para que cuando el usuario ingrese por primera vez, se muestre el contenido del primer producto
mostrarProductoEnFormulario();

//si hay un cambio en el select de productosDisponibles, se actualiza el contenido del formulario
productosDisponibles.addEventListener('change', ()=>{
    indiceSeleccionado = productosDisponibles.value;
     mostrarProductoEnFormulario();
})


//funcion para habilitar los inputs del formulario y ocultar botones de modificar, nuevo y eliminar
//y muestra el boton de cancelar
function cambioEditarProducto(){
    inputsProducto.forEach(element => element.disabled = false); //habilitar inputs
    inputsProducto[0].disabled = true;
    categoriaProducto.disabled = false;
    
    //label e input de titulo de producto
    labelProducto[1].style.display = "block"; 
    inputsProducto[1].style.display = "block";

    //label y select de titulo de producto
    labelProducto[2].style.display = "none";
    productosDisponibles.style.display = "none";

    botonCancelarEdicionProducto.style.display = 'block';
    botonModificarProducto.style.display = 'none';
    botonNuevoProducto.style.display = 'none';
    botonEliminarProducto.style.display = 'none';

    divBotonCargar.classList.add("cargar");
    divUrlProducto.classList.add("cargar");
}


//funcion para deshabilitar los inputs del formulario,
// mostrar botones de modificar, nuevo y eliminar
//y oculta el boton de cancelar
function cambioNoEditarProducto(){
    inputsProducto.forEach(element => element.disabled = true);
    categoriaProducto.disabled = true;
   
    //label y input de titulo de producto
    labelProducto[1].style.display = "none"; 
    inputsProducto[1].style.display = "none";

    //label y select de titulo de producto
    labelProducto[2].style.display = "block";
    productosDisponibles.style.display = "block";

    botonCancelarEdicionProducto.style.display = 'none';
    botonModificarProducto.style.display = 'block';
    botonNuevoProducto.style.display = 'block';
    botonEliminarProducto.style.display = 'block';

    divBotonCargar.classList.remove("cargar");
    divUrlProducto.classList.remove("cargar");

}

botonModificarProducto.addEventListener('click', ()=>{
    for(let i=1;i<=4;i++){
        inputsProducto[i].setCustomValidity("");
    }
    reescribirProducto = true;
    inputsProducto[4].value = "";
    cambioEditarProducto();
})

botonNuevoProducto.addEventListener('click',()=>{
    inputsProducto[4].required = true; 
    reescribirProducto = false;
    inputsProducto[4].value = "";
    inputsProducto.forEach((cajaTexto)=>{
        cajaTexto.value = "";
    })
    inputsProducto[0].value = productosDisponibles.options.length + 1;
    console.log(inputsProducto);
    inputsProducto[5].value = "Cargar"
    pNombreUrlImagen.textContent = "no se ha cargado un archivo";
    cambioEditarProducto();

    for(let i=1; i<=mensajeAlerta.length ; i++){
        inputsProducto[i].setCustomValidity(mensajeAlerta[i-1]);
    }
})

botonCancelarEdicionProducto.addEventListener('click', ()=>{
    indiceSeleccionado = productosDisponibles.value;
    mostrarProductoEnFormulario();
    cambioNoEditarProducto();
})

botonEliminarProducto.addEventListener('click', ()=>{
    modalEliminarProducto.style.display = "block";
    //modificarJSON.eliminarProducto(inputsProducto[0].value);
})

modalEliminarProducto.querySelector('.cerrar').addEventListener( 'click', ()=>{
    modalEliminarProducto.style.display = "none";
})


formularioModificarCrearProducto.addEventListener('submit', (event)=>{
    event.preventDefault();
    console.log(inputsProducto[4].files[0])
    if(!(event.target[7].files[0] === undefined)){
        //código para leer la imagen y convertirlo a texto para poder almacenarlo
        const file = event.target[7].files[0];
        console.log(event);
        console.log(event.target[7])
        console.log(event.target[7].files[0])
        const reader = new FileReader(); // Crea un lector de archivos
        reader.onload = function(e) {
            //console.log(e);
            imagen = e.target.result;
            console.log(imagen)
        };
        reader.readAsDataURL(file);
        //fin del código para leer la imagen
    }
    //es necesario un tiempo de espera para que pueda procesar la imagen y ahi si seguir con el código
    setTimeout(vistaPreliminar,1000);
    
});

inputsProducto[4].addEventListener('change', function(){
        if(inputsProducto[4].files.length > 0){
            console.log(inputsProducto[4].files[0].name)
            pNombreUrlImagen.textContent = inputsProducto[4].files[0].name;
        }

})

//Cuando el usuario oprima en cargar, se actualiza el contenido de divProducto dentro del modal y se muestra
function vistaPreliminar() {
    console.log("entra en vista previa")
    console.log(imagen);
    html = "";
    html =  `<div class="contenedorImagenCard"><img src="${imagen}" alt=""></div>
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
}

//funcion llamada con el botón de cerrar de vista previa del producto
cerrarVistaPrevia.addEventListener('click', ()=>{ modalVistaPrevia.style.display = 'none';});
botonCancelarCambios.addEventListener('click', ()=>{ modalVistaPrevia.style.display = 'none';});
botonAceptarCambios.addEventListener('click', ()=>{
     modalVistaPrevia.style.display = 'block'
     cargarProducto();
     ;});


function cargarProducto (){
     //reescribirOCrearProducto(id,nombre,descripción,categoria,precio,urlImg,Reescribir)
     modificarJSON.reescribirOCrearProducto(
        inputsProducto[0].value,
        inputsProducto[1].value,
        inputsProducto[2].value,
        categoriaProducto.value,
        inputsProducto[3].value,
        imagen,
        reescribirProducto
       )
       imagen = "";
}


//Lineas de código para poder cambiar el mensaje predeterminado de cada uno de los inputs
let mensajeAlerta = ["Escribe el nombre del plato",
                    "Escribe que contiene el plato",
                    "Escribe el precio del producto",
                    "Carga una imagen"];

formularioModificarCrearProducto.addEventListener('input', (event)=>{
    // console.log(event.target.id);
    let i=0;
    switch(event.target.id){
        case "tituloProduto":
            i=1;
            break;
        case "descripcionProducto":
            i=2;
            break;
        case "precioProducto":
            i=3;
            break;
        case "urlProducto":
            i=4;
            break;
        default:
            break;
    }
    if(i!=0){
        if(inputsProducto[i].value == ""){
            inputsProducto[i].setCustomValidity(mensajeAlerta[i-1]);
        }else{
            console.log(inputsProducto[i]);
            inputsProducto[i].setCustomValidity("");
        }
    }
})




