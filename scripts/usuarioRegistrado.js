//script para poner el nombre de usuario en todas las paginas
let nameUser =  document.getElementById('nameUser');
if(localStorage.getItem('usuario') != undefined){
    if( localStorage.getItem('usuario').length != 0 ){
        nameUser.innerText = localStorage.getItem('usuario');
    }else{
        nameUser.innerText = "Ingresar";
    }
}

    

