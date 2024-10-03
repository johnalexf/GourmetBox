export let url = "http://localhost:3000/productos";
export let urlEscribir = "";
export let metodo = '';

//funcion para agregar un nuevo producto o reescribirlo
export async function reescribirOCrearProducto(id,nombre,descripcion,categoria,precio,urlImg,Reescribir) {
    
    if(Reescribir == true){
        metodo = 'PUT';
        urlEscribir = url + '/' + id;
    }else{
        metodo = 'POST';
        urlEscribir = url;
    }


    try {
        
        // Enviar la solicitud POST para agregar el nuevo producto
        const respuesta = await fetch(urlEscribir, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                nombre: nombre,
                descripcion: descripcion,
                categoria: categoria,
                precio: precio,
                url: urlImg
            }),
        });

        if (!respuesta.ok) {
            throw new Error(`Error agregando producto: ${respuesta.statusText}`);
        }

    } catch (error) {
        console.error('Error agregando producto:', error.message);
    }

}

export async function eliminarProducto(id) {
    
    try{
        const deleteResponse = await fetch(url + '/' + id, {
            method: 'DELETE',
        });

        if (deleteResponse.status === 404) {
            console.error(`Error borrando al producto: no encontrado`);
            return;
        } else if (!deleteResponse.ok) {
            throw new Error(`Error borrando al producto: ${deleteResponse.statusText}`);
        }

        console.log(`Producto con id ${id} borrado correctamente.`);

    }catch (error) {
            console.error('Error:', error.message);
    }

}

let url2 = "../scripts/baseDatos.json"; 

export async function obtenerBaseDatos() {
    
    try {
        // Realiza una solicitud fetch para obtener el JSON
        const respuesta = await fetch(url2);
        
        // Verifica si la solicitud fue exitosa
        if (!respuesta.ok) {
          throw new Error('Error al obtener el JSON');
        }
    
        // Convierte la respuesta a un objeto JavaScript
        const datos = await respuesta.json();
        
        //console.log(datos)
        return datos;
         
      } catch (error) {
        console.error('Error:', error.message);
      }
    
}


// export async function refrescar(cadena) {
    
//     console.log("entro")
    
//         try {
//             for(let i=0; i < cadena.length; i++){
       
//                 // Enviar la solicitud POST para agregar el nuevo producto
//                 const respuesta = await fetch( url + '/' (i+1), {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(cadena[i])
//                 });

//                 if (!respuesta.ok) {
//                     throw new Error(`Error agregando producto: ${respuesta.statusText}`);
//                 }
//         }
//         } catch (error) {
//             console.error('Error agregando usuario:', error.message);
//         }

    
// }