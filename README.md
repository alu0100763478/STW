BibliotecaT. Proyecto final: Sistemas y tecnologías Web
---
Nombre: Rossiel D. González Ramírez.
Dirección del proyecto: [BibliotecaT](http://10.6.129.129)
## Objetivos

La aplicación web BibliotecaT tiene como objetivo principal ser un punto de encuentro entre lectores y escritores. En ella, los lectores podrán:
 - Disfrutar de libros libres de derechos de autor en formato html.
 - Crear relatos y compartirlos con la comunidad.
 - Leer relatos de otros usuarios.
 - Puntuar relatos.
## Herramientas utilizadas
- HTML5. Lenguaje básico de la World Wide Web.
- CSS. Hojas de estilo en cascada se utiliza para describir el aspecto o presentación del contenido en una Página Web.
- NodeJs. Framework de código abierto para construir el servidor. [Enlace a la página oficial](https://nodejs.org/es/)
- Express. Infraestructura de aplicaciones web Node.js 
- npm. Manejador de paquetes por defecto para Node.js, un entorno de ejecución para JavaScript.
- MongoDB.  Base de datos NoSQL. [Enlace a la página oficial](https://www.mongodb.com/es)
-  Bootstrap. Framework web.
- JavaScript. Lenguaje de programación que se ejecuta en el navegador

### Organización del repositorio
- Raíz: contiene package.json e index.js. En package.json, va a quedar reflejada la configuración del proyecto de Node tales como: nombre del proyecto, autor, dependencias, scripts, repositorio Git, etc. En index.js queda la configuración del servidor.
- app: contiene los métodos de petición HTTP, los que se usaron fuero GET y POST.
- config: contiene la configuración de la base de datos y de el middleware de autenticación para Node Passport.
- models: contiene los distintos esquemas o modelos de las bases de datos que se usan.
- node_modules: contiene los módulos que usa node y los cuales se han instalado previamente.
-  	public: contiene los ficheros estáticos.
-  	views: contiene las plantillas EJS para generar html.

### Instalación

1. Clonar repositorio.

```sh
$ git clone https://github.com/alu0100763478/STW.git
```
2. Instalar Node
```sh
$ sudo apt-get install -y nodejs
```
3. Instalar dependencias desde el fichero package.json
```sh
$ npm install
```
Sin embargo, en ocasiones MongoDB no se instala correctamente por lo que, si ocurre algún problema en la instalación, es aconsejable seguir la guía de instalación de MongoDB [en este enlace](https://docs.mongodb.com/manual/installation/)
4. Actualizar dependecias
```sh
$ npm update
```
5. Ejecutar MongoDB
```sh
$ mongod
```
6. Ejecutar servidor
```sh
$ npm start
```
