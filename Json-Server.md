# GourmetBox
  Para que funcione el acceso y la edición de un archivo JSON,
usamos dos paquetes Node.js y json-server

pasos para poder ejecutar un servidor virtual, localmente y simular el consumo y edición de una API:
1.Paso:
Instalar node.js, en el proyecto abres la terminal y ejecutas el siguiente comando: npm install node.js

2.Paso
Instalar json-server, ejecuta el siguiente comando npm install -g json-server 

3.Paso
Para poner en marcha tu servidor local, escribe json-server --watch ./scripts/jsonproductos.json
en este caso ./scripts/jsonproductos.json es la ubicación de la base de datos que quieres simular como API


json-server --watch ./scripts/jsonproductos.json

Aquí una breve explicación para que entiendas que hace cada comando

Node.js: Normalmente, JavaScript se utiliza dentro de un navegador web (como Chrome o Firefox) para hacer que las páginas web sean interactivas. Sin embargo, Node.js permite que uses JavaScript fuera del navegador, es decir, directamente en tu computadora o servidor. Esto significa que puedes usar JavaScript para crear cosas como servidores web, automatizar tareas, o desarrollar aplicaciones sin depender de un navegador. En resumen, Node.js convierte a JavaScript en un lenguaje que también puede funcionar en el "back-end" (el lado del servidor o lógica interna de una aplicación).

npm (Node Package Manager): enorme biblioteca o tienda de herramientas de código (llamadas "paquetes" o "módulos") que puedes usar en tus proyectos de programación. En lugar de tener que escribir todo el código desde cero, puedes buscar y descargar estos paquetes, que ya han sido escritos y compartidos por otros programadores. npm te ayuda a administrar esos paquetes, descargándolos, actualizándolos o eliminándolos cuando ya no los necesites.

npm install -g json-server: 

npm install: Le estás diciendo a npm que instale un paquete (o herramienta) en tu proyecto o en tu computadora.
-g: Esto le indica a npm que instale el paquete globalmente. Esto significa que este paquete estará disponible para que lo uses desde cualquier parte de tu computadora, no solo en un proyecto específico.
json-server: Este es el nombre del paquete que quieres instalar. json-server es una herramienta que crea un servidor web muy simple a partir de un archivo JSON. Esto es útil cuando quieres simular un servidor en tu computadora para hacer pruebas mientras desarrollas aplicaciones que necesitan interactuar con bases de datos.
En resumen, cuando escribes npm install -g json-server, le estás pidiendo a npm que instale una herramienta llamada json-server en toda tu computadora para que puedas usarla en cualquier proyecto. Esta herramienta te permite crear un servidor falso que maneja datos, perfecto para practicar o probar aplicaciones sin tener un servidor real.