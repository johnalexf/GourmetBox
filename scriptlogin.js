const loginBtn = document.querySelector(".loginBtn");
const registroBtn = document.querySelector(".registroBtn");
const formBox = document.querySelector(".formBox");
const body = document.querySelector("body");


registroBtn.onclick = function(){
    formBox.classList.add('active');
    body.classList.add('active');
}

loginBtn.onclick = function(){
    formBox.classList.remove('active');
    body.classList.remove('active');
}

