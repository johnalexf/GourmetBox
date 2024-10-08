export let urlProductos = "http://localhost:3000/productos";
export let urlEscribir = "";
export let metodo = '';

//funcion para agregar un nuevo producto o reescribirlo
export async function reescribirOCrearProducto(id,nombre,descripcion,categoria,precio,urlImg,Reescribir) {
    
    if(Reescribir == true){
        metodo = 'PUT';
        urlEscribir = urlProductos + '/' + id;
    }else{
        metodo = 'POST';
        urlEscribir = urlProductos;
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
        const deleteResponse = await fetch(urlProductos + '/' + id, {
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

let urlProductosLocal = "../scripts/baseDatos.json"; 

export async function obtenerBaseDatos() {
    
    try {
        // Realiza una solicitud fetch para obtener el JSON
        const respuesta = await fetch(urlProductosLocal);
        
        // Verifica si la solicitud fue exitosa
        if (!respuesta.ok) {
          throw new Error('Error al obtener el JSON');
        }
    
        // Convierte la respuesta a un objeto JavaScript
        const datos = await respuesta.json();
        
        //console.log(datos)
        return datos.productos;
         
      } catch (error) {
        console.error('Error:', error.message);
      }
    
}

export let urlUsuarios = "http://localhost:3000/usuarios";

//funcion para agregar un nuevo producto o reescribirlo
export async function reescribirOCrearUsuario(usuario,nombre,correo,telefono,contrasena,Reescribir) {
    
    if(Reescribir == true){
        metodo = 'PUT';
        urlEscribir = urlUsuarios + '/' + id;
    }else{
        metodo = 'POST';
        urlEscribir = urlUsuarios;
    }

    try {
        
        // Enviar la solicitud POST para agregar el nuevo producto
        const respuesta = await fetch(urlEscribir, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: usuario,
                rol: "usuario",
                nombre : nombre,
                correo : correo,
                telefono : telefono,
                contrasena : contrasena
            }),
        });

        if (!respuesta.ok) {
            throw new Error(`Error agregando o modificando usuario: ${respuesta.statusText}`);
        }

    } catch (error) {
        console.error('Error agregando o modificando usuario:', error.message);
    }

}

let urlUsuariosLocal = "../scripts/baseDatos.json"; 
export async function verificarSiUsuarioExiste(usuario) {
            
    try {
        // Realiza una solicitud fetch para obtener el JSON
        const respuesta = await fetch(urlUsuariosLocal);
        
        // Verifica si la solicitud fue exitosa
        if (!respuesta.ok) {
          throw new Error('Error al obtener el JSON');
        }
    
        // Convierte la respuesta a un objeto JavaScript
        const datos = await respuesta.json();
        const usuarios = await datos.usuarios;
        let retorno = false;

        usuarios.forEach(element => {
            if(element.id == usuario){
                retorno = true;
            }
        });

        return retorno;
      } catch (error) {
        console.error('Error:', error.message);
      } 
}

export async function verificarContrasena(usuario,contrasena) {
            
    try {
        // Realiza una solicitud fetch para obtener el JSON
        const respuesta = await fetch(urlUsuariosLocal);
        
        // Verifica si la solicitud fue exitosa
        if (!respuesta.ok) {
          throw new Error('Error al obtener el JSON');
        }
    
        // Convierte la respuesta a un objeto JavaScript
        const datos = await respuesta.json();
        const usuarios = await datos.usuarios;
        let usuarioSiExiste = false;
        let contrasenaCorrecta = false;
        let datosUsuario = {};

        usuarios.forEach(element => {
            if(element.id == usuario){
                usuarioSiExiste = true;
                if(contrasena == element.contrasena ){
                    contrasenaCorrecta = true;
                    datosUsuario = {
                        id : element.id,
                        rol: element.rol,
                        nombre: element.nombre,
                        correo: element.correo,
                        telefono : element.telefono
                    }
                }
            }
        });

        return [usuarioSiExiste, contrasenaCorrecta, datosUsuario];
      } catch (error) {
        console.error('Error:', error.message);
      } 
}