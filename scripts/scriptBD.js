export let urlProductos = "https://gourmetboxbackend-production.up.railway.app/producto/";
//export let urlProductos = "http://localhost:8080/producto/";
export let urlEscribir = "";
export let metodo = '';

//obtener datos de todos los platos
export async function obtenerBaseDatos() {
    
    try {
        // const respuesta = await fetch(urlProductos + "traer");
        const respuesta = await fetch(urlProductos + "traer", {
            credentials: 'include'
          });
        
        if (!respuesta.ok) {
          throw new Error('Error al obtener el JSON');
        }

        const datos = await respuesta.json();
        
        return datos;
      } catch (error) {
        console.error('Error:', error.message);
      }
    
}

//borrar un usuario por el id
export function eliminarProducto(id) {

    const xhr = new XMLHttpRequest();
    const url = urlProductos + 'borrar/' + id;

    xhr.open('DELETE', url, true);

    xhr.onload = function() {
        if (this.status === 200) {
            console.log(`Producto con id ${id} borrado correctamente.`);
        } else if (this.status === 404) {
            console.error(`Error borrando al producto: no encontrado`);
        } else {
            console.error(`Error borrando al producto: ${this.statusText}`);
        }
    };

    xhr.onerror = function() {
        console.error('Error de red:', this.statusText);
    };

    xhr.send();
}


//variable de la urlProductos = "http://localhost:8080/producto/";
//funcion para agregar un nuevo producto o reescribirlo
export async function reescribirOCrearProducto(id,nombre,descripcion,categoria,precio,urlImg,Reescribir) {
    
    const xhr = new XMLHttpRequest();
    let url;
    //Funcion con AJAX
    if (Reescribir) {
        url = `${urlProductos}editar/${id}?nombre=${nombre}&descripcion=${descripcion}&categoria=${categoria}&image=""&precio=${precio}`;
        xhr.open('PUT', url, true);
        console.log(url)
    } else {
        url = urlProductos + "crear";
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
    }

    return new Promise((resolve, reject) => {
        xhr.onload = function() {
            if (this.status === 200) {
                try {
                    let response;
                    if(Reescribir){
                        response = JSON.parse(this.responseText);
                    }else{
                        response = this.responseText;
                    }
                    
                    console.log('Respuesta del servidor:', response);
                    resolve(true); // Resuelve la promesa con true si la operación fue exitosa
                } catch (error) {
                    console.error('Error al parsear la respuesta:', error);
                    reject(error);
                }
            } else {
                console.error('Error:', this.statusText, 'Código de estado:', this.status);
                reject(new Error('Error en la solicitud'));
            }
        };

        xhr.onerror = function() {
            console.error('Error de red');
            reject(new Error('Error de red'));
        };

        if (!Reescribir) {
            xhr.send(JSON.stringify({
                nombre_producto : nombre,
                descripcion_producto : descripcion,
                categoria : categoria,
                img_producto : urlImg,
                precio_producto : precio
            }));
        } else {
            xhr.send(
                urlImg
            );
        }
    });

}



//sección para comunicación con la base de datos de usuarios
export let urlUsuario = "https://gourmetboxbackend-production.up.railway.app/usuario/";

//funcion para agregar un nuevo producto o reescribirlo
export function reescribirOCrearUsuario(id, usuario, nombre, correo, telefono, contrasena, esAdministrador, Reescribir) {
    
    const xhr = new XMLHttpRequest();
    let url;
    //Funcion con AJAX
    if (Reescribir) {
        url = `${urlUsuario}editar/${id}?nombre=${nombre}&telefono=${telefono}&correo=${correo}`;
        console.log(url);
        xhr.open('PUT', url, true);
    } else {
        url = urlUsuario + "crear";
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
    }

    xhr.onload = function () {
        if (this.status === 200) {
            try {
                let response;
                    if(Reescribir){
                        response = JSON.parse(this.responseText);
                    }else{
                        response = this.responseText;
                    }
                    
                console.log('Respuesta del servidor:', response);
            } catch (error) {
                console.error('Error al parsear la respuesta:', error);
            }
        } else {
            console.error('Error:', this.statusText, 'Código de estado:', this.status);
            // Mostrar un mensaje de error al usuario basado en el código de estado
            if (this.status === 404) {
                alert('Usuario no encontrado');
            } else {
                alert('Ocurrió un error al procesar la solicitud');
            }
        }
    };


    xhr.onerror = function () {
        console.error('Error de red');
    };


    if (!Reescribir) {
        xhr.send(JSON.stringify({
            user_name: usuario,
            nombre_usuario: nombre,
            correo: correo,
            telefono: telefono,
            contrasena: contrasena,
            es_administrador: false
        }));
    } else {
        xhr.send();
    }

}

//No funciono con fetch para hacer PUT o POST

// export async function reescribirOCrearUsuario(id,usuario,nombre,correo,telefono,contrasena,esAdministrador,Reescribir) {

//     //variable reescribir si es verdadera es para hacer una reescribir del usuario
//     //si es falsa se crea un nuevo usuario
    
//     try {

//         let respuesta;

//         if(Reescribir == true){
//             urlEscribir = urlUsuario + 'editar/' + id + "?";

//             respuesta = await fetch(`${urlEscribir}nombre=${nombre}&telefono=${telefono}&correo=${correo}`,
//                { method: 'PATCH'
//                }
//             );

//             if (!respuesta.ok) {
//                 throw new Error(`Error al conectarse con la pagina: ${respuesta.statusText}`);
//             }
    

//             console.log(await respuesta.json());
            
//         }else{
   
//          // Enviar la solicitud POST para agregar o editar usuario
//           respuesta = await fetch(urlUsuario + "crear/", {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     user_name: usuario,
//                     nombre_usuario : nombre,
//                     correo : correo,
//                     telefono : telefono,
//                     contrasena : contrasena,
//                     es_administrador: esAdministrador
//                 }),
//             });

//             if (!respuesta.ok) {
//                 throw new Error(`Error al conectarse con la pagina: ${respuesta.statusText}`);
//             }
 
//         }

        
//     } catch (error) {
//         console.error('Error agregando o modificando usuario:', error.message);
//     }

// }


export async function verificarSiUsuarioExiste(usuario) {
            
        try {

            // Realiza una solicitud fetch para obtener el JSON
            const respuesta = await fetch(urlUsuario + "verificar/"+  usuario + "/" + "aaaa");
   
            // Verifica si la solicitud fue exitosa
            if (!respuesta.ok) {
              throw new Error('Error al obtener el JSON');
            }
    
            const id_usuario = await respuesta.text(); 
    
            let existe = false;
    
            if(id_usuario != "0" ){
               existe = true;
            }
   
           return existe;
           
         } catch (error) {
           console.error('Error:', error.message);
         } 
}

//verifica si la contraseña coincide para el usuario y devuelve la información del perfil
export async function verificarContrasena(usuario,contrasena) {
            
    try {
        // Realiza una solicitud fetch para obtener el JSON
        const respuesta = await fetch(urlUsuario + "verificar/"+  usuario + "/" + contrasena);
        console.log(respuesta);
        // Verifica si la solicitud fue exitosa
        if (!respuesta.ok) {
          throw new Error('Error al obtener el JSON');
        }

        const id_usuario = await respuesta.text(); 

        let usuarioSiExiste = false;
        let contrasenaCorrecta = false;
        let datosUsuarioReturn = {};

        if(id_usuario == "0"){
            usuarioSiExiste = false;
        }else{
            if(id_usuario == "-1"){
                usuarioSiExiste = true;
            }else{
                usuarioSiExiste = true;
                contrasenaCorrecta = true;

                const respuesta2 = await fetch(urlUsuario + "obtener/" +  id_usuario);
                const datosUsuario = await respuesta2.json();
               
                datosUsuarioReturn = {
                        id: datosUsuario.id_usuario,
                        userName : datosUsuario.user_name,
                        nombreUsuario: datosUsuario.nombre_usuario,
                        correo: datosUsuario.correo,
                        telefono : datosUsuario.telefono,
                        suscripcionId : datosUsuario.suscripcion,
                        esAdministrador : datosUsuario.es_administrador
                    }
              
            }
        }

        return [usuarioSiExiste, contrasenaCorrecta, datosUsuarioReturn];
      } catch (error) {
        console.error('Error:', error.message);
      } 
}


//
export async function confirmarContrasenaParaEditarPerfil(usuario,contrasena) {
            
    try {

         // Realiza una solicitud fetch para obtener el JSON
         const respuesta = await fetch(urlUsuario + "verificar/"+  usuario + "/" + contrasena);

         // Verifica si la solicitud fue exitosa
         if (!respuesta.ok) {
           throw new Error('Error al obtener el JSON');
         }
 
         const id_usuario = await respuesta.text(); 
 
         let contrasenaCorrecta = true;
 
         if(id_usuario == "0" || id_usuario == "-1" ){
            contrasenaCorrecta = false;
         }

        return contrasenaCorrecta;
        
      } catch (error) {
        console.error('Error:', error.message);
      } 
}



//funcion para encriptar la contraseña
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