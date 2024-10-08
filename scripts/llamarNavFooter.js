// // Cargar el contenido del footer
// fetch('../HTML/navbar.html')
//     .then(response => response.text())
//     .then(data => {
//     document.getElementById('Navbar').innerHTML = data;
//     console.log(data)
//     })
//     .catch(error => console.error('Error al cargar el footer:', error));



// Cargar el contenido del footer
fetch('../HTML/footer.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('footer').innerHTML = data;
    
    })
    .catch(error => console.error('Error al cargar el footer:', error));
 