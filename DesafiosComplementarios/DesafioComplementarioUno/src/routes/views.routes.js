import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/", async (req,res) => {
    res.render("home",{
        title:"Home",
        js:"script.js"
    });
})

viewsRouter.get("/productos", async (req,res) => {
    res.render("productos",{
        title:"Productos",
        js:"productos.js"
    });
})

viewsRouter.get("/crearProducto", async (req,res) => {
    res.render("crearProducto",{
        title:"Crear producto",
        js:"crearProducto.js"
    });
})

viewsRouter.get("/borrarProducto", async (req,res) => {
    res.render("borrarProducto",{
        title:"Eliminar producto",
        js:"borrarProducto.js"
    });
})

viewsRouter.get("/mensajes", async (req,res) => {
    res.render("mensajes",{
        title:"Mensajes",
        js:"mensajes.js"
    });
})

export default viewsRouter;