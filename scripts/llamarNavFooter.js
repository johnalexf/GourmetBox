// Cargar el contenido del footer

let urlFooter = "";

document.title == "Inicio"?
    urlFooter = './HTML/footer.html':
    urlFooter = '../HTML/footer.html'

fetch(urlFooter)
    .then(response => response.text())
    .then(data => {
    document.getElementById('footer').innerHTML = data;
    
    })
    .catch(error => console.error('Error al cargar el footer:', error));
 