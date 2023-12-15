//IMPORTACIONES
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passport from "passport";
import initPassport from "../config/passport.js"
import session from "express-session";
import MongoStore from "connect-mongo";
import router from "../routes/index.routes.js";
import { engine } from "express-handlebars";
import { __dirname } from "../Path.js";
import path from "path";


//Especificar puerto
export const PORT = 4000;

//Generar una instancia de express en app
export const APP = express();

export const httpServer = APP.listen(PORT, () => {
    console.log(`[SERVIDOR EN PUERTO ${PORT}]`);
    console.log(`[INGRESE A http://localhost:4000/views/home PARA CONTINUAR]`);
});

export function serverConfiguracionInicial () {
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
    APP.use(cookieParser(process.env.SIGNED_COOKIE));
    APP.use(session ({
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            ttl: 1000
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }));
    

    initPassport();
    APP.use(passport.initialize());
    APP.use(passport.session());
}

function appSetUpUseRoutes () {
    //Rutas
    APP.use("/",router);
}

//Conectarse a la base de datos de mongo
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("[MONGO DB] CONEXION REALIZADA CON EXITO"))
.catch(() => console.log("[MONGO DB] CONEXION FALLIDA"));
