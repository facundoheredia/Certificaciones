//IMPORTACIONES
import express from "express";
import productsRouter from "../routes/products.routes.js";
import cartRouter from "../routes/carts.routes.js";
import viewRouter from "../routes/views.routes.js"
import { engine } from "express-handlebars";
import { __dirname } from "../Path.js";
import path from "path";

//Especificar puerto
export const PORT = 4000;

//Generar una instancia de express en app
export const APP = express();

export const httpServer = APP.listen(PORT, () => {
    console.log(`[SERVIDOR EN PUERTO ${PORT}]`);
    console.log(`[INGRESE A http://localhost:4000/views/ PARA CONTINUAR]`);
});

export function serverConfigInit () {
    //Motor de render a utilizar
    APP.engine("handlebars", engine());

    appSetUpSetConfig ();
    appSetUpUseConfig ();
    appSetUpUseRoutes ();
}

function appSetUpSetConfig () {
    //Seteado de aplicacion
    APP.set("view engine","handlebars");
    //Donde estan las vistas
    APP.set("views",path.resolve(__dirname,"./views"));
}

function appSetUpUseConfig () {
    //Hacer que express use JSON
    APP.use(express.json());
    //Permitir largas querys
    APP.use(express.urlencoded({extended: true}));
}

function appSetUpUseRoutes () {
   //Rutas
    APP.use("/api/products",productsRouter);
    APP.use("/api/carts",cartRouter);
    APP.use("/views",express.static(path.join(__dirname,"/public")));
    APP.use("/views",viewRouter);
}

