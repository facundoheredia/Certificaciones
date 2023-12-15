import { Router } from "express";
import { carritoModel } from "../models/carts.models.js";
import { productoModel } from "../models/products.models.js"

const cartRouter = Router ();

cartRouter.get ("/", async (req,res) => {
    const {limite} = req.query;

    try {
        const carritos = await carritoModel.find().limit(limite);
        res.status(200).send({respuesta: "[OK]", mensaje: carritos});
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: "No se han podido cargar los carritos"});
    }
})

cartRouter.get ("/:cid", async (req,res) => {
    const {cid} = req.params;

    try {
        const carrito = await carritoModel.findById(cid);

        if(carrito) {
            res.status(200).send({respuesta: "[OK]", mensaje: carrito});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido encontrar el carrito"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
})

cartRouter.post ("/", async (req,res) => {
    try {
        const carrito = await carritoModel.create({});

        if(carrito) {
            res.status(200).send({respuesta: "[OK]", mensaje: "Carrito creado correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido crear el carrito"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
})

cartRouter.post ("/:cid/productos/:pid", async (req,res) => {
    const {cid,pid} = req.params;
    const {cantidad} = req.body;
    
    try {
        const carrito = await carritoModel.findById(cid);

        if(carrito) {
            const producto = await productoModel.findById(pid);
            if(producto) {
                const indiceProducto = carrito.productos.findIndex(producto => producto.idProducto === pid);
                if(indiceProducto != -1) {
                    carrito.productos[indiceProducto].cantidad = cantidad;
                    res.status(200).send({respuesta: "[OK]", mensaje: "Se agrego correctamente mas cantidad al producto del carrito"});
                } else {
                    carrito.productos.push({idProducto: pid, cantidad: cantidad});
                    res.status(200).send({respuesta: "[OK]", mensaje: "Producto agregado al carrito correctamente"});
                }
                await carritoModel.findByIdAndUpdate(cid, carrito);
            } else {
                res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido encontrar el producto"});
            }
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido encontrar el carrito"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
})


export default cartRouter;