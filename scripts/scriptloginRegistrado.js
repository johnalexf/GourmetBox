// Código para cambiar de visualización si el usuario hace un correcto login
//divBodyLogin contiene toda la estructura de formularios de registro y de login
let divBodyLogin = document.querySelector(".bodyLogin");
let divUsuarioRegistrado = document.querySelectorAll(".divUsuarioRegistrado");
let botonRealizarIngreso = document.querySelector("#realizarIngreso");
let formularioIngreso = document.querySelector("#formulario");
let nameUser1 =  document.getElementById('sesion');
let tipoUsuario = "";
let indiceTipoUsuario = 0;


function averiguarTipoUsuario(){
    tipoUsuario = localStorage.getItem('usuario');
    if(tipoUsuario == 'admin'){
        indiceTipoUsuario = 1 ;
    }else{
        indiceTipoUsuario = 0 ;
    }
}


function mostrarPerfil(){
    averiguarTipoUsuario();
    divBodyLogin.classList.remove('mostrar');
    divBodyLogin.classList.add('ocultar');
    setTimeout( function(){
        divBodyLogin.style.display = 'none';
        divUsuarioRegistrado[indiceTipoUsuario].style.display = 'block';
        },500 )

    setTimeout(function(){
        divUsuarioRegistrado[indiceTipoUsuario].classList.remove('ocultar');
        divUsuarioRegistrado[indiceTipoUsuario].classList.add('mostrar');
        },500)
}

function mostrardivBodyLogin(){
    averiguarTipoUsuario();
    divUsuarioRegistrado[indiceTipoUsuario].classList.remove('mostrar');
    divUsuarioRegistrado[indiceTipoUsuario].classList.add('ocultar');
    setTimeout( function(){
        divBodyLogin.style.display = 'flex';
        divUsuarioRegistrado[indiceTipoUsuario].style.display = 'none';
    },500 )
    setTimeout( function(){
        divBodyLogin.classList.remove('ocultar');
        divBodyLogin.classList.add('mostrar');
    },500 );

    nameUser1.innerText = "Ingresar";
    localStorage.setItem( 'usuario', '');
}


// si existe la variable usuario y tiene contenido, mostramos la vista de perfil y ocultamos la de formularios de registro o ingreso
if(localStorage.getItem('usuario') != undefined){
  if( localStorage.getItem('usuario').length != 0 ){
    mostrarPerfil();
  }
}

//Cuando oprime en ingresar, verifica el usuario y la contraseña, si son correctas muestra el div de perfil y oculta el de formularios de ingreso
botonRealizarIngreso.onclick = function(event) {
  event.preventDefault();
  if(formularioIngreso.usuario.value === "admin" && formularioIngreso.contrasena.value === "1234" ){
    localStorage.setItem( 'usuario', 'admin');
    mostrarPerfil();
    nameUser1.innerText = localStorage.getItem('usuario');
  }
  if(formularioIngreso.usuario.value === "usuario" && formularioIngreso.contrasena.value === "1234" ){
    localStorage.setItem( 'usuario', 'usuario');
    mostrarPerfil();
    nameUser1.innerText = localStorage.getItem('usuario');
  }
}

//Cuando cierra sesión muestra los formularios y oculta el perfil de usuario o de administrador
function cerrarSesion(){
    mostrardivBodyLogin();
}
  
  
