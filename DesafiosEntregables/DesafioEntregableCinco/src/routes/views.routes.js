import { Router } from "express";
import {usuarioModel} from "../models/users.models.js";

const viewsRouter = Router();

viewsRouter.get("/signUp", async (req,res) => {
    res.render("signUp",{
        title:"Regristrarse",
        js:"ingresar.js",
        css:"body.css"
    });
})

viewsRouter.post("/signUp", async (req,res) => {
    const {nombre, apellido, edad, email, contrasenia, contraseniaConfirmacion} = req.body;
    const errores = [];
    
    if(contrasenia != contraseniaConfirmacion) {
        errores.push({mensaje:"Las contraseñas no coinciden"})
    } else {
        if(contrasenia.length < 6) {
            errores.push({mensaje:"La contraseña debara tener 6 o mas caracteres"})
        } else {
            const emailRegistrado = await usuarioModel.findOne({email: email});

            if(emailRegistrado) {
                errores.push({mensaje:"El email ya se encuentra registrado"})
            } else {
                const nuevoUsuario = await usuarioModel.create({nombre, apellido, edad, email, contrasenia});
                nuevoUsuario.save();
                res.redirect("/views/login");
            }
        }
    }

    if(errores.length > 0) {
        res.render("signUp", {
            errores: errores,
            title:"Regristrarse",
            js:"ingresar.js",
            css:"body.css"
        })
    }
})

viewsRouter.get("/login", async (req,res) => {
    res.render("login",{
        title:"Ingresar",
        js:"ingresar.js",
        css:"body.css"
    });
})

viewsRouter.post("/login", async (req,res) => {
    const {email, contrasenia} = req.body;
    const errores = [];

    const usuarioRegistrado = await usuarioModel.findOne({email: email});

    if(usuarioRegistrado) {
        if(contrasenia == usuarioRegistrado.contrasenia) {
            req.session.login = true;
            req.session.usuario = usuarioRegistrado;
            res.redirect("/views/home");
        } else {
            errores.push({mensaje:"La contraseña no es correcta vuelvelo a intentar"})
        }
    } else {
        errores.push({mensaje:"El usuario no existe vuelvelo a intentar"})
    }

    if(errores.length > 0) {
        res.render("login", {
            errores: errores,
            title:"Ingresar",
            js:"ingresar.js",
            css:"body.css"
        })
    }
})

viewsRouter.get("/loguot", async (req,res) => {
    req.session.destroy();
    res.redirect("/views/home")
})

viewsRouter.get("/home", async (req,res) => {
    if(req.session.login) {
        const usuarioLogeado = req.session.usuario;
        res.render("home",{
            title:"Home",
            js:"script.js",
            css:"body.css",
            usuario: usuarioLogeado
        });
    } else {
        res.render("home",{
            title:"Home",
            js:"script.js",
            css:"body.css",
            usuario: false
        });
    }
})

viewsRouter.get("/productos", async (req,res) => {
    if(req.session.login) {
        const usuarioLogeado = req.session.usuario;
        res.render("productos",{
            title:"Productos",
            js:"productos.js",
            css:"body.css",
            usuario: usuarioLogeado
        });
    } else {
        res.render("productos",{
            title:"Productos",
            js:"productos.js",
            css:"body.css"
        });
    }
})

viewsRouter.get("/carritos", async (req,res) => {
    if(req.session.login) {
        const usuarioLogeado = req.session.usuario;
        res.render("carritos",{
            title:"Carritos",
            js:"carritos.js",
            css:"body.css",
            usuario: usuarioLogeado
        });
    } else {
        res.render("carritos",{
            title:"Carritos",
            js:"carritos.js",
            css:"body.css"
        });
    }
})

viewsRouter.get("/carritos/:cid", async (req,res) => {
    if(req.session.login) {
        const usuarioLogeado = req.session.usuario;
        res.render("carritoDetalle",{
            title:"Detalle del carrito",
            js:"../../js/carritoDetalle.js",
            css:"../../css/body.css",
            usuario: usuarioLogeado
        });
    } else {
        res.render("carritoDetalle",{
            title:"Detalle del carrito",
            js:"../../js/carritoDetalle.js",
            css:"../../css/body.css"
        });
    }
})

viewsRouter.get("/mensajes", async (req,res) => {
    if(req.session.login) {
        const usuarioLogeado = req.session.usuario;
        res.render("mensajes",{
            title:"Mensajes",
            js:"mensajes.js",
            css:"body.css",
            usuario: usuarioLogeado
        });
    } else {
        res.render("mensajes",{
            title:"Mensajes",
            js:"mensajes.js",
            css:"body.css"
        });
    }
})

export default viewsRouter;