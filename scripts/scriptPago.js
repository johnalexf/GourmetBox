import {seccionNavbar} from './manipulacionNavbar.js';

console.log(seccionNavbar.id);

// se importa de script suscripción las variables que contienen
// el precio del plan a pagar
// el nombre de la suscripción a adquirir
// el botón con el cual se acepta que esta de acuerdo adquirir el plan

import {precio,nombreSuscripcion,agreeButton} from './scriptSuscripcion.js';

    


agreeButton.addEventListener("click", () => {
    const costo = document.getElementById("costo");
    costo.value = precio;

    const sInfo = document.getElementById("sInfo");
    sInfo.value = nombreSuscripcion;
    
    const modalPago = document.querySelector(".contenedorPago");
    modalPago.style.display = "block";

});

const numberTC = document.getElementById("number");
const nombreTC = document.getElementById("nameCreditCard");
const fechaV = document.getElementById("fechaV");
const cvv = document.getElementById("inputCVV");
const inputNumber = document.getElementById("numberCT");
const inputNombre = document.getElementById("nombreCT");
const expiraDate = document.getElementById("expiraDate");
const brand = document.getElementById("brand");

inputNumber.addEventListener("input", () => {

    if (inputNumber.value[0]==="4") {
        brand.src = "../img/visa.png";
    }else if (inputNumber.value[0]==="5") {
        brand.src = "../img/master.png"; 
        } else {
            brand.src = "../img/visa.png";
        }

    if (/[^0-9\s]/.test(inputNumber.value)) {
        inputNumber.setCustomValidity("Solo se permiten números y espacios");
    } else {
        numberTC.textContent = inputNumber.value;
        inputNumber.setCustomValidity("");
    }

    inputNumber.reportValidity(); 
});

inputNombre.addEventListener("input", () => {
    nombreTC.textContent = inputNombre.value;
});

expiraDate.addEventListener("input", () => {
    const fecha = expiraDate.value;
    const [year , mes] = fecha.split("-");
    fechaV.textContent = `${mes}/${year.slice(-2)}`;
});

cvv.addEventListener("click", () => {

    const frente = document.getElementById("frente");
    const atras = document.getElementById("atras");

    frente.style.visibility = "hidden";
    frente.style.opacity = "0";

    atras.style.visibility = "visible";
    atras.style.opacity = "1";

});

cvv.addEventListener("mouseout", () => {
    const frente = document.getElementById("frente");
    const atras = document.getElementById("atras");

    atras.style.visibility = "hidden";
    atras.style.opacity = "0";

    frente.style.visibility = "visible";
    frente.style.opacity = "1";    
});


cvv.addEventListener("input", () => {
    const cvvP = document.getElementById("lineaBlanca");
    cvvP.textContent = cvv.value;
});


const cerrar = document.querySelector(".cerrarTerminos");

cerrar.addEventListener("click", () => {
    const modalPago = document.querySelector(".contenedorPago");
    modalPago.style.display = "none";
});


const btnPago = document.getElementById("realizarPago");

btnPago.addEventListener("click", () => {
    
    if(cvv.value != "" && inputNumber.value != "" && inputNombre.value != "" && expiraDate.value != ""){
        swal("Pago Recibido!", "Bienvenido a la Familia GBox!", "success");
        const modalPago = document.querySelector(".contenedorPago");
        modalPago.style.display = "none";
    }else{
        swal("Debes Verificar!", "Asegurate de Ingresar los Datos de tu Tarjeta Correctamente", "warning");
    }
});

