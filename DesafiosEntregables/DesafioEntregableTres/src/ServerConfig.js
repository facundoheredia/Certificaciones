//IMPORTACIONES
import express from "express";

//Especificar puerto
export const PORT = 4000;

//Generar una instancia de express en app
export const APP = express();

//Hacer que express use JSON
export const ServidorLecturaJson = express.json();


export function servidorMenuPrincipal () {
    let mensajeDeInicio = "<h1>[SERVIDOR]</h1>";

    mensajeDeInicio += "<h4>[=======================]</h4>";
    mensajeDeInicio += "<h4>[1] => PAGINA PRINCIAL</h4>";
    mensajeDeInicio += "<p>Esta es la url de la pagina principal del servidor. URL: http://localhost:4000/</p>";
    mensajeDeInicio += "<a href=http://localhost:4000/>[PAGINA PRINCIPAL]</a>";
    mensajeDeInicio += "<p>Para poder ingresar y utilizar las otras funciones del servidor continue leyendo.</p>";
    mensajeDeInicio += "<h4>[2] => TEST DE ARCHIVO Y PRODUCTOS</h4>";
    mensajeDeInicio += "<p>Ingrese a la siguiente url para iniciar el test de productos. URL: http://localhost:4000/test</p>";
    mensajeDeInicio += "<a href=http://localhost:4000/test>[HACER TEST]</a>";
    mensajeDeInicio += "<h4>[3] => LISTA DE TODOS LOS PRODUCTOS</h4>";
    mensajeDeInicio += "<p>En esta url se mostraran todos los productos guardados en el servidor. URL: http://localhost:4000/products</p>";
    mensajeDeInicio += "<a href=http://localhost:4000/products>[PRODUCTOS]</a>";
    mensajeDeInicio += "<p>En esta url se mostraran todos los productos guardados en el servidor segun un limite indicado.</p>";
    mensajeDeInicio += "Se debera usar el url de products agregandole .../?limit=2 al final segun el limite que se quiera mostrar.";
    mensajeDeInicio += "<p>URL: http://localhost:4000/products/?limit=2</p>";
    mensajeDeInicio += "<h4>[4] => CARGAR NUEVO PRODUCTO</h4>";
    mensajeDeInicio += "<p>Proximamente.</p>";
    mensajeDeInicio += "<h4>[5] => BUSCAR UN PRODUCTO POR ID</h4>";
    mensajeDeInicio += "<p>Se debera usar el url de products agregandole .../1 al final segun la id del producto buscado.</p>";
    mensajeDeInicio += "<p>URL: http://localhost:4000/products/1</p>";
    mensajeDeInicio += "<h4>[6] => MODIFICAR UN PRODUCTO</h4>";
    mensajeDeInicio += "<p>Proximamente.</p>";
    mensajeDeInicio += "<h4>[7] => BORRAR UN PRODUCTO</h4>";
    mensajeDeInicio += "<p>Proximamente.</p>";
    mensajeDeInicio += "<h4>[=======================]</h4>";

    return mensajeDeInicio;
}