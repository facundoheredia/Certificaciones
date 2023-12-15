//IMPORTACIONES
import express from "express";
import productsRouter from "../routes/products.routes.js";
import cartRouter from "../routes/carts.routes.js";

//Especificar puerto
export const PORT = 4000;

//Generar una instancia de express en app
export const APP = express();

//Hacer que express use JSON
APP.use(express.json());
//Permitir largas querys
APP.use(express.urlencoded({extended: true}));
//Rutas
APP.use("/api/products",productsRouter);
APP.use("/api/carts",cartRouter);

export function servidorMenuPrincipal () {
    let mensajeDeInicio = "<h1>[BIENVENIDO AL SERVIDOR]</h1>";

    mensajeDeInicio += "<h4>[=======================]</h4>";
    mensajeDeInicio += "<h4>[1] => PAGINA PRINCIAL SERVIDOR</h4>";
    mensajeDeInicio += "<p>Esta es la url de la pagina principal del servidor. URL: http://localhost:4000/api/</p>";
    mensajeDeInicio += "<a href=http://localhost:4000/api/>[PAGINA PRINCIPAL]</a>";
    mensajeDeInicio += "<p>Para poder ingresar y utilizar las otras funciones del servidor continue leyendo.</p>";
    mensajeDeInicio += "<h4>[=======================]</h4>";
    mensajeDeInicio += "<h3>[PRODUCTS ROUTER]</h3>";
    mensajeDeInicio += "<h4>[2] => LISTA DE TODOS LOS PRODUCTOS</h4>";
    mensajeDeInicio += "<p>En esta url se mostraran todos los productos guardados en el servidor. URL: http://localhost:4000/api/products</p>";
    mensajeDeInicio += "<a href=http://localhost:4000/api/products>[PRODUCTOS]</a>";
    mensajeDeInicio += "<p>En esta url se mostraran todos los productos guardados en el servidor segun un limite indicado.</p>";
    mensajeDeInicio += "Se debera usar el url de products agregandole .../?limit=2 al final segun el limite que se quiera mostrar.";
    mensajeDeInicio += "<p>URL: http://localhost:4000/api/products/?limit=2</p>";
    mensajeDeInicio += "<h4>[3] => CARGAR NUEVO PRODUCTO</h4>";
    mensajeDeInicio += "<p>Se podra utilizar el metodo POST usando Postman, Thunder Cliente o similar</p>";
    mensajeDeInicio += "<p>Utilizar el metodo POST con la url de products (punto 2)</p>";
    mensajeDeInicio += "<p>No usar la key ID en el body del producto a crear ya que esta es creada automaticamente</p>";
    mensajeDeInicio += "<h4>[4] => BUSCAR UN PRODUCTO POR ID</h4>";
    mensajeDeInicio += "<p>Se debera usar el url de products agregandole .../1 al final segun la id del producto buscado.</p>";
    mensajeDeInicio += "<p>URL: http://localhost:4000/api/products/1</p>";
    mensajeDeInicio += "<h4>[5] => MODIFICAR UN PRODUCTO</h4>";
    mensajeDeInicio += "<p>Se podra utilizar el metodo PUT usando Postman, Thunder Cliente o similar</p>";
    mensajeDeInicio += "<p>Utilizar el metodo PUT con la url de products id (punto 4)</p>";
    mensajeDeInicio += "<h4>[6] => BORRAR UN PRODUCTO</h4>";
    mensajeDeInicio += "<p>Se podra utilizar el metodo DELETE usando Postman, Thunder Cliente o similar</p>";
    mensajeDeInicio += "<p>Utilizar el metodo DELETE con la url de products id (punto 4)</p>";
    mensajeDeInicio += "<h4>[=======================]</h4>";
    mensajeDeInicio += "<h3>[CARTS ROUTER]</h3>";
    mensajeDeInicio += "<h4>[7] => LISTA DE TODOS LOS CARTS</h4>";
    mensajeDeInicio += "<p>En esta url se mostraran todos los carts guardados en el servidor. URL: http://localhost:4000/api/carts</p>";
    mensajeDeInicio += "<a href=http://localhost:4000/api/carts>[CARTS]</a>";
    mensajeDeInicio += "<p>En esta url se mostraran todos los carts guardados en el servidor segun un limite indicado.</p>";
    mensajeDeInicio += "Se debera usar el url de carts agregandole .../?limit=2 al final segun el limite que se quiera mostrar.";
    mensajeDeInicio += "<p>URL: http://localhost:4000/api/carts/?limit=2</p>";
    mensajeDeInicio += "<h4>[8] => CARGAR UN NUEVO CART</h4>";
    mensajeDeInicio += "<p>Se podra utilizar el metodo POST usando Postman, Thunder Cliente o similar</p>";
    mensajeDeInicio += "<p>Utilizar el metodo POST con la url de cart (punto 7)</p>";
    mensajeDeInicio += "<p>No se debe enviar un body, solo usar metodo POST con url de carts, se creara un cart nuevo con un array vacion de products y su id correspondiente</p>";
    mensajeDeInicio += "<h4>[9] => BUSCAR UN CART POR ID</h4>";
    mensajeDeInicio += "<p>Se debera usar el url de carts agregandole .../1 al final segun la id del cart buscado.</p>";
    mensajeDeInicio += "<p>URL: http://localhost:4000/api/carts/1</p>";
    mensajeDeInicio += "<h4>[10] => CARGAR NUEVO PRODUCTO A UN CART</h4>";
    mensajeDeInicio += "<p>Se podra utilizar el metodo POST usando Postman, Thunder Cliente o similar</p>";
    mensajeDeInicio += "<p>Utilizar el metodo POST con la url de carts (punto 2)</p>";
    mensajeDeInicio += "<p>Se debera agregar al url de carts agregandole .../1 para el ID del cart al cual agregar, luego .../products y por ultimo el id del producto que se quiera agregar.</p>";
    mensajeDeInicio += "<p>URL ejemplo: http://localhost:4000/api/carts/1/products/2</p>";

    return mensajeDeInicio;
}