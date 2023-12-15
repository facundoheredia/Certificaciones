import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/", async (req,res) => {
    res.render("home",{
        title:"Home",
        js:"script.js",
        css:"body.css"
    });
})

viewsRouter.get("/productos", async (req,res) => {
    res.render("productos",{
        title:"Productos",
        js:"productos.js",
        css:"body.css"
    });
})

viewsRouter.get("/carritos", async (req,res) => {
    res.render("carritos",{
        title:"Carritos",
        js:"carritos.js",
        css:"body.css"
    });
})


viewsRouter.get("/carritos/:cid", async (req,res) => {
    res.render("carritoDetalle",{
        title:"Detalle del carrito",
        js:"../../js/carritoDetalle.js",
        css:"../../css/body.css"
    });
})


viewsRouter.get("/mensajes", async (req,res) => {
    res.render("mensajes",{
        title:"Mensajes",
        js:"mensajes.js",
        css:"body.css"
    });
})

export default viewsRouter;