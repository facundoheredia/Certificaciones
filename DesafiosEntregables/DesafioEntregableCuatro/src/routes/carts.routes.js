import { Router } from "express";
import {CartManager} from "../Clases/CartManager.js";
import {__dirname} from "../Path.js";

//CONSTANTES
const pathCartServidor = __dirname + "/models/Carts.json";
const cartManagerServer = new CartManager (pathCartServidor);
const cartRouter = Router();

cartRouter.get("/", async (req,res) => {
    let limit = parseInt(req.query.limit);
    const arrayDeCarts = await cartManagerServer.getCarts();

    if(arrayDeCarts.length !== 0) {
        if(!limit) {
            res.status(200).send(arrayDeCarts);
        } else {
            res.status(200).send(arrayDeCarts.slice(0,limit));
        }
    } else {
        res.status(404).send("No hay ningun Carrito");
    }
})

cartRouter.get("/:cid", async (req,res) => {
    const cid = parseInt(req.params.cid)
    const cartBuscado = await cartManagerServer.getCartById(cid);

    if(cartBuscado) {
        res.status(200).send(cartBuscado);
    } else {
        res.status(400).send("Carrito no encontrado");
    }
})

cartRouter.get("/:cid/products", async (req,res) => {
    const cid = parseInt(req.params.cid)
    const productosDelCarrito = await cartManagerServer.getProductsFromCart(cid);

    if(productosDelCarrito) {
        res.status(200).send(productosDelCarrito);
    } else {
        res.status(400).send("Carrito no encontrado");
    }
})

cartRouter.post("/", async (req,res) => {
    const resultadoAddCart = await cartManagerServer.addCart(req.body);
    
    switch (resultadoAddCart) {
        case 0:
            res.status(200).send("Carrito creado con exito");
            break;
        case -1:
            res.status(400).send("Ya existe el id del carrito");
            break;
    }
})

cartRouter.post("/:cid/products/:pid", async (req,res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const resultadoAddCart = await cartManagerServer.addProductToCart(cid,pid);

    console.log(`[resultado addProductToCart ${resultadoAddCart}]`);
    
    switch (resultadoAddCart) {
        case 0:
            res.status(200).send("Producto agregado al carrito con exito");
            break;
        case 1:
            res.status(200).send("Se ha agregado mas cantidad al producto existente en el carrito");
            break;
        case -1:
            res.status(400).send("No existe el id del carrito");
            break;
        case -2:
            res.status(400).send("No existe el id del producto");
            break;
        default:
            res.status(400).send("No se pudo resolver");
    }
})

export default cartRouter;