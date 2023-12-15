import { Router } from "express";
import { ProductManager } from "../Clases/ProductManager.js";
import {__dirname} from "../Path.js";

//CONSTANTES
const pathArchivoServidor = __dirname + "/models/Products.json";
export const productManagerServer = new ProductManager(pathArchivoServidor);
const productsRouter = Router();

productsRouter.get("/", async (req,res) => {
    let limit = parseInt(req.query.limit);
    const arrayDeProductos = await productManagerServer.getProducts();

    res.render("home", {
        title: "Home",
        productos: arrayDeProductos
    });
})

productsRouter.get("/:pid", async (req,res) => {
    const pid = parseInt(req.params.pid)
    const productoBuscado = await productManagerServer.getProductById(pid);

    if(productoBuscado) {
        res.status(200).send(productoBuscado);
    } else {
        res.status(400).send("Producto no encontrado");
    }
})

productsRouter.post("/", async (req,res) => {
    const resultadoAddProduct = await productManagerServer.addProduct(req.body);
    
    switch (resultadoAddProduct) {
        case 0:
            res.status(200).send("Product creado con exito");
            break;
        case -1:
            res.status(400).send("Ya existe el codigo del producto");
            break;
        case -2:
            res.status(400).send("El producto no tiene todos los campos llenos");
            break;
    }
})

productsRouter.put("/:pid", async (req,res) => {
    const pid = parseInt(req.params.pid);
    const productoModificado = req.body;
    const resultadoUpdateProduct = await productManagerServer.updateProduct(pid,productoModificado);

    if(resultadoUpdateProduct === 0) {
        res.status(200).send("Producto actualizado");
    } else {
        req.status(400).send("Producto no encontrado");
    }
})

productsRouter.delete("/:pid", async (req,res) => {
    const pid = parseInt(req.params.pid)
    const resultadoDeleteProduct = await productManagerServer.deleteProduct(pid);
        
    if(resultadoDeleteProduct === 0) {
        res.status(200).send("Producto eliminado");
    } else {
        req.status(400).send("Producto no encontrado");
    }
})

export default productsRouter;



/*
productsRouter.get("/", async (req,res) => {
    let limit = parseInt(req.query.limit);
    const arrayDeProductos = await productManagerServer.getProducts();

    if(arrayDeProductos.length !== 0) {
        if(!limit) {
            res.status(200).send(arrayDeProductos);
        } else {
            res.status(200).send(arrayDeProductos.slice(0,limit));
        }
    } else {
        res.status(404).send("No hay ningun Producto");
    }
})
*/