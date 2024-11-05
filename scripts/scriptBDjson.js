//script para usar la base de datos local por medio del servidor JSON
//al ejecutarla con json-server --watch ../baseDatos.js para mas informacion consulta
//Activar_SErvidor.txt

//Si deseas probarlo le cambias el nombre del archivo a scriptBD.js

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
        // o a traves de put modificar el producto
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
        }else{
            return true;
        }

    } catch (error) {
        console.error('Error agregando producto:', error.message);
        return false;
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

//let urlProductosLocal = "../scripts/baseDatos.json"; 
let urlProductosLocal = "http://localhost:3000/productos";

export async function obtenerBaseDatos() {
    
    try {
        const respuesta = await fetch(urlProductosLocal);
        
        if (!respuesta.ok) {
          throw new Error('Error al obtener el JSON');
        }

        // const datos = await respuesta.json();
        // return datos.productos;

        const datos = await respuesta.json();
        return datos;
         
      } catch (error) {
        console.error('Error:', error.message);
      }
    
}


//script para comunicación con la base de datos de usuarios
export let urlUsuarios = "http://localhost:3000/usuarios";

//funcion para agregar un nuevo producto o reescribirlo
export async function reescribirOCrearUsuario(id,usuario,nombre,correo,telefono,contrasena,esAdministrador,Reescribir) {

    //variable reescribir si es verdadera es para hacer una reescripcion del usuario
    //si el falsa se crea un nuevo usuario
    
    try {

        if(Reescribir == true){
            metodo = 'PUT';
            urlEscribir = urlUsuarios + '/' + id;
        }else{
            metodo = 'POST';
            urlEscribir = urlUsuarios;
    
            const respuesta = await fetch(urlUsuariosLocal);
            const usuarios = await respuesta.json();
            id = (usuarios.length + 1).toString();
        }
        
        // Enviar la solicitud POST para agregar o editar usuario
        const respuesta = await fetch(urlEscribir, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_usuario:id,
                user_name: usuario,
                nombre_usuario : nombre,
                correo : correo,
                telefono : telefono,
                contrasena : contrasena,
                suscripcion_id : "0",
                es_administrador: esAdministrador
            }),
        });

        if (!respuesta.ok) {
            throw new Error(`Error agregando o modificando usuario: ${respuesta.statusText}`);
        }

    } catch (error) {
        console.error('Error agregando o modificando usuario:', error.message);
    }

}

//let urlUsuariosLocal = "../scripts/baseDatos.json"; 
let urlUsuariosLocal = "http://localhost:3000/usuarios"; 
export async function verificarSiUsuarioExiste(usuario) {
            
    try {
        const respuesta = await fetch(urlUsuariosLocal);
        
        if (!respuesta.ok) {
          throw new Error('Error al obtener el JSON');
        }

        const usuarios = await respuesta.json(); 

        let retorno = false;

        usuarios.forEach(element => {
            if(element.userName == usuario){
                retorno = true;
            }
        });

        return retorno;
      } catch (error) {
        console.error('Error:', error.message);
      } 
}

//verifica si la contraseña coincide para el usuario y devuelve la información del perfil
export async function verificarContrasena(usuario,contrasena) {
            
    try {
        // Realiza una solicitud fetch para obtener el JSON
        const respuesta = await fetch(urlUsuariosLocal);
        
        // Verifica si la solicitud fue exitosa
        if (!respuesta.ok) {
          throw new Error('Error al obtener el JSON');
        }

        const usuarios = await respuesta.json(); 

        let usuarioSiExiste = false;
        let contrasenaCorrecta = false;
        let datosUsuario = {};

        usuarios.forEach(element => {
            if(element.userName === usuario){
                usuarioSiExiste = true;
                if(contrasena === element.contrasena ){
                    contrasenaCorrecta = true;
                    datosUsuario = {
                        id: element.id,
                        userName : element.userName,
                        nombreUsuario: element.nombreUsuario,
                        correo: element.correo,
                        telefono : element.telefono,
                        suscripcionId : element.suscripcionId,
                        esAdministrador : element.esAdministrador
                    }
                }
            }
        });

        return [usuarioSiExiste, contrasenaCorrecta, datosUsuario];
      } catch (error) {
        console.error('Error:', error.message);
      } 
}

export async function confirmarContrasenaParaEditarPerfil(usuario,contrasena) {
            
    try {
        // Realiza una solicitud fetch para obtener el JSON
        const respuesta = await fetch(urlUsuariosLocal);
        
        // Verifica si la solicitud fue exitosa
        if (!respuesta.ok) {
          throw new Error('Error al obtener el JSON');
        }

        const usuarios = await respuesta.json();

        let contrasenaCorrecta = false;

        usuarios.forEach(element => {
            if(element.userName === usuario){
                if(contrasena === element.contrasena ){
                    contrasenaCorrecta = true;
                }
            }
        });

        return contrasenaCorrecta;
      } catch (error) {
        console.error('Error:', error.message);
      } 
}




export function encrypt_data(string) {

    string = decodeURI(encodeURIComponent(string));
    // console.log(string);
    var newString = '', char, nextChar, combinedCharCode;

    for (var i = 0; i < string.length; i += 2) {
        char = string.charCodeAt(i);

        if ((i + 1) < string.length) {
            nextChar = string.charCodeAt(i + 1) - 31;
            combinedCharCode = char + "" + nextChar.toLocaleString('en', {
                minimumIntegerDigits: 2
            });
            newString += String.fromCharCode(parseInt(combinedCharCode, 10));
        } else {
            newString += string.charAt(i);
        }
    }
    return newString.split("").reduce((hex,c)=>hex+=c.charCodeAt(0).toString(16).padStart(4,"0"),"");
  }