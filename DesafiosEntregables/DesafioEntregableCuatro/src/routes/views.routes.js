import { Router } from "express";
import { productManagerServer } from "./products.routes.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req,res) => {
    res.render("home",{
        title:"Home",
        js:"script.js"
    });
})

viewsRouter.get("/products", async (req,res) => {
    const arrayDeProductos = await productManagerServer.getProducts();
    res.render("products",{
        title:"Productos",
        productos: arrayDeProductos,
        js:"script.js"
    });
})

viewsRouter.get("/realTimeProducts", async (req,res) => {
    res.render("realTimeProducts",{
        title:"Productos en tiempo real",
        js:"realTimeProducts.js"
    });
})

viewsRouter.get("/createProduct", async (req,res) => {
    res.render("createProduct",{
        title:"Crear producto",
        js:"createProducts.js"
    });
})

viewsRouter.get("/deleteProduct", async (req,res) => {
    res.render("deleteProducts",{
        title:"Eliminar producto",
        js:"deleteProducts.js"
    });
})

export default viewsRouter;