//script para poner el nombre de usuario en todas las paginas
let nameUser =  document.getElementById('sesion');
if(localStorage.getItem('usuario') != undefined){
    if( localStorage.getItem('usuario').length != 0 ){
        nameUser.innerText = localStorage.getItem('usuario');
    }else{
        nameUser.innerText = "Ingresar";
    }
}

console.log(document.title.toLowerCase());
console.log(document.getElementById(document.title.toLowerCase()).innerText);
let seccionNavbar = document.getElementById(document.title.toLowerCase());
seccionNavbar.style.fontWeight = "bold";
    

