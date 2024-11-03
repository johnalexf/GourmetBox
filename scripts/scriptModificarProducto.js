//javascript que realiza las funciones necesarias para eliminar o modificar un producto
import * as bd from "../scripts/scriptBD.js";

// variable para almacenar modificaciones que se van a insertar en HTML
let html = "";

//variable que contiene el formulario y después se obtienen todos los inputs para modificar su contenido interno
//dependiendo del select escogido, ademas también se usan para guardar un nuevo producto dependiendo del caso
let formularioModificarCrearProducto = document.getElementById('modificarCrearProducto');

let pNombreUrlImagen = document.getElementById('nombreUrlImagen');
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
let cerrarVistaPrevia = document.getElementById('cerrarVistaPrevia');

//variables para cada uno de los botones de modificar o crear producto
let divUrlProducto = document.querySelector('.divUrlProducto');
let divBotonCargar = document.getElementById('divBotonCargar');
let botonModificarProducto = document.getElementById('botonModificarProducto');
let botonCancelarEdicionProducto = document.getElementById('botonCancelarEdicionProducto');
let botonNuevoProducto = document.getElementById('botonNuevoProducto');
let botonEliminarProducto = document.getElementById('botonEliminarProducto');
//variable de control la cual diferencia si se va sobrescribir o crear un producto nuevo
let reescribirProducto = false;

//variables para el modal de eliminar producto
let modalEliminarProducto = document.getElementById('modalEliminarProducto');
let botonAceptarEliminar = document.getElementById('botonAceptarEliminar');
let botonCancelarEliminar = document.getElementById('botonCancelarEliminar');
let botonCerrarModalEliminarProducto = document.getElementById('cerrarModalEliminarProducto');

//variable para guardar la imagen de forma de texto
let imagen;


//función para cargar la información del producto seleccionado en cada uno de sus correspondientes input
async function mostrarProductoEnFormulario() {

            html = "";
            let productos = await bd.obtenerBaseDatos();
            console.log(productos);
            productos.forEach(element => {
                html +=  `<option value="${element.id_producto}">${element.nombre_producto}</option>` ;
                if(element.id_producto == indiceSeleccionado){
                    inputsProducto[0].value = element.id_producto;
                    inputsProducto[1].value = element.nombre_producto;
                    inputsProducto[2].value = element.descripcion_producto;
                    categoriaProducto.value = element.categoria;
                    inputsProducto[3].value = element.precio_producto;
                    pNombreUrlImagen.textContent = "imagen cargada";
                    imagen = element.img_producto;
                    // console.log(imagen);
                }
            });
            productosDisponibles.innerHTML = html;
            if(indiceSeleccionado !=0){
                productosDisponibles.value = indiceSeleccionado;
            }
            //ya que traemos la imagen de la base de datos, no requerimos cargar una imagen
            //de igual forma si el usuario desea cargar una nueva, lo puede hacer
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
        inputsProducto[i].setCustomValidity("");// deshabilita los mensajes de advertencia desde el inicio de modificar
    }
    reescribirProducto = true;
    inputsProducto[4].value = ""; //si hay un archivo previo cargado con el boton, este se elimina
    cambioEditarProducto();
})

botonNuevoProducto.addEventListener('click',()=>{
    inputsProducto[4].required = true; 
    reescribirProducto = false;
    inputsProducto[4].value = "";
    inputsProducto.forEach((cajaTexto)=>{
        cajaTexto.value = "";
    })
    inputsProducto[0].value = parseInt(productosDisponibles.options[productosDisponibles.length-1].value) + 1;
    // console.log(inputsProducto);
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
    modalEliminarProducto.style.display = "flex";
    //bd.eliminarProducto(inputsProducto[0].value);
})
botonAceptarEliminar.addEventListener('click', async function(){
    //await bd.eliminarProducto(inputsProducto[0].value)
    bd.eliminarProducto(inputsProducto[0].value);
    indiceSeleccionado = 1;
    mostrarProductoEnFormulario();
    cerrarModalEliminarProducto();
})

botonCerrarModalEliminarProducto.addEventListener( 'click', cerrarModalEliminarProducto);

botonCancelarEliminar.addEventListener('click', cerrarModalEliminarProducto);

function cerrarModalEliminarProducto(){
    modalEliminarProducto.style.display = "none";
}


formularioModificarCrearProducto.addEventListener('submit', (event)=>{
    event.preventDefault();
    //instrucciones para obtener la imagen y guardarla en la variable imagen
    if(!(event.target[7].files[0] === undefined)){
        //código para leer la imagen y convertirlo a texto para poder almacenarlo
        const file = event.target[7].files[0];
        console.log(event.target[7].files[0])
        const reader = new FileReader(); // Crea un lector de archivos
        reader.onload = function(e) {
            //console.log(e);
            imagen = e.target.result;
            // console.log(imagen)
        };
        reader.readAsDataURL(file);
        //fin del código para leer la imagen
    }
    //es necesario un tiempo de espera para que pueda procesar la imagen y ahi si seguir con el código
    setTimeout(vistaPreliminar,1000);
    
});

//Poner el nombre del archivo que se carga en seleccionar archivo en el parrafo junto 
inputsProducto[4].addEventListener('change', function(){
   
        if(inputsProducto[4].files.length > 0){
            // let longitudFile = inputsProducto[4].files[0].name.length;
            console.log(inputsProducto[4].files[0].name)
            pNombreUrlImagen.textContent = inputsProducto[4].files[0].name;
        }

})

//Cuando el usuario oprima en cargar, se actualiza el contenido de divProducto dentro del modal y se muestra
function vistaPreliminar() {
    console.log("entra en vista previa")
    html = "";
    html =  `<div class="contenedorImagenCard"><img src="${imagen}" alt=""></div>
            <div class="contenedorTituloCard">
            <h5> ${inputsProducto[1].value} </h5>
            </div>
            <div class="contenedorDescripcionCard"><p>${inputsProducto[2].value}</p></div>
            <div class="contenedorPrecioCard"><p> <b>${parseInt(inputsProducto[3].value).toLocaleString()} COP</b> </p></div>
            <div class="contenedorBotonCard">
              <button class="botonCardMenu"><i class="bi bi-cart4 iconoBotonCard"></i></button>
             </div>
             `;
    divProducto.innerHTML = html;
    modalVistaPrevia.style.display = 'flex';
}

//funcion llamada con el botón de cerrar de vista previa del producto
cerrarVistaPrevia.addEventListener('click', ()=>{ modalVistaPrevia.style.display = 'none';});
botonCancelarCambios.addEventListener('click', ()=>{ modalVistaPrevia.style.display = 'none';});
botonAceptarCambios.addEventListener('click', async ()=>{
     modalVistaPrevia.style.display = 'flex'
     await cargarProducto();
     ;});


async function cargarProducto (){
     //reescribirOCrearProducto(id,nombre,descripción,categoria,precio,urlImg,Reescribir)
     if (await bd.reescribirOCrearProducto(
        inputsProducto[0].value,
        inputsProducto[1].value,
        inputsProducto[2].value,
        categoriaProducto.value,
        parseInt(inputsProducto[3].value),
        imagen,
        reescribirProducto
       )
    ){
        indiceSeleccionado = inputsProducto[0].value;
        mostrarProductoEnFormulario();
        modalVistaPrevia.style.display = 'none';
        cambioNoEditarProducto();
    }
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
            inputsProducto[i].setCustomValidity("");
        }
    }
})

// let clave = "John12/&%";
// console.log(clave);
// console.log(bd.encrypt_data(clave));





