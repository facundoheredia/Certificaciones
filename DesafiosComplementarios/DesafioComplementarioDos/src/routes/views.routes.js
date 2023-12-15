import { Router } from "express";
import {usuarioModel} from "../models/users.models.js";
import passport from "passport";

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

viewsRouter.post("/login", passport.authenticate("login",{successRedirect:"./home",failureRedirect:"./login"}), async (req,res) => {
    try {
        if(!req.user) {
            res.status(401).send({mensaje: "usuario invalido"});
        } else {
            res.status(200).send({payload: req.user});
        }
    } catch (error) {
        res.status(500).send({mensaje: `[ERROR] - error al iniciar sesion ${error}`});
    }
})

viewsRouter.get("/loginWithGithub", passport.authenticate("githubViews", {scope:["user:email"]}), async (req,res) => {})

viewsRouter.get("/loginWithGithubCallback", passport.authenticate("githubViews",{successRedirect:"./home", failureRedirect:"./login"}), async (req,res) => {
    try {
        if(!req.user) {
            res.status(401).send({mensaje: "usuario invalido"});
        } else {
            req.session.user = req.user;
            res.status(200).send({payload: req.user});
        }
    } catch (error) {
        res.status(500).send({mensaje: `[ERROR] - error al iniciar sesion ${error}`});
    }
})

viewsRouter.get("/loguot", async (req,res) => {
    req.session.destroy();
    res.redirect("/views/home")
})

viewsRouter.get("/home", async (req,res) => {
    if(req.user) {
        const usuarioLogeado = req.user.toJSON();
        
        let esAdmin = false;

        if(usuarioLogeado.rol == "admin") {
            esAdmin = true;
        }

        res.render("home",{
            title:"Home",
            js:"script.js",
            css:"body.css",
            usuario: usuarioLogeado,
            admin: esAdmin
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
    if(req.user) {
        const usuarioLogeado = req.user.toJSON();
        let esAdmin = false;

        if(usuarioLogeado.rol == "admin") {
            esAdmin = true;
        }

        res.render("productos",{
            title:"Productos",
            js:"productos.js",
            css:"body.css",
            usuario: usuarioLogeado,
            admin: esAdmin
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
    if(req.user) {
        const usuarioLogeado = req.user.toJSON();

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
    if(req.user) {
        const usuarioLogeado = req.user.toJSON();
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
    if(req.user) {
        const usuarioLogeado = req.user.toJSON();
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