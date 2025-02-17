// Cargar el contenido del footer

let urlFooter = "";

document.title == "Inicio"?
    urlFooter = './HTML/footer.html':
    urlFooter = '../HTML/footer.html'

fetch(urlFooter)
    .then(response => response.text())
    .then(data => {
        //con el fin de extraer solo el footer realizamos un filtro de todo el html footer.html
        let palabraFiltro = "footer";
        const inicio = data.indexOf("<"+ palabraFiltro);
        const fin = data.indexOf(palabraFiltro + ">", inicio); // Busca desde la posición de inicio
        let texto;

        if (inicio !== -1 && fin !== -1) {
            texto = data.slice(inicio, (fin + palabraFiltro.length + 1)); // Extraer
        } 
        document.getElementById('footer').innerHTML = texto;
        console.log(typeof(texto))
        console.log(texto)
    })
    .catch(error => console.error('Error al cargar el footer:', error));
 
 