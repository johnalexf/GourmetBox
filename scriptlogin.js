const loginBtn = document.querySelector(".ingresoBoton");
const registroBtn = document.querySelector(".registroBoton");

const contieneFormulario = document.querySelector(".contieneFormularios");
const body = document.querySelector(".bodyLogin");


registroBtn.onclick = function(){
    contieneFormulario.classList.add('active');
    body.classList.add('active');
}

loginBtn.onclick = function(){
    contieneFormulario.classList.remove('active');
    body.classList.remove('active');
}

