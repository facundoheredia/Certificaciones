import { Router } from "express";
import { carritoModel } from "../models/carts.models.js";
import { productoModel } from "../models/products.models.js"

const cartRouter = Router ();

cartRouter.get ("/", async (req,res) => {
    const {limite} = req.query;

    try {
        const carritos = await carritoModel.find().limit(limite);

        if(carritos) {
            res.status(200).send({respuesta: "[OK]", mensaje: carritos});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se han podido encontrar a los carritos"});
        }
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
                const indiceProducto = carrito.productos.findIndex(producto => producto.idProducto._id.toString() === pid);
                
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

cartRouter.put ("/:cid", async (req,res) => {
    const {cid} = req.params;
    const productos = req.body;

    try {
        const carrito = await carritoModel.findById(cid);
        if(carrito) {
            productos.forEach( async productoNuevo => {
                const indiceProducto = carrito.productos.findIndex(productoEnCarrito => productoEnCarrito.idProducto._id.toString() === productoNuevo.idProducto);
                if(indiceProducto != -1) {
                    carrito.productos[indiceProducto].cantidad = productoNuevo.cantidad;
                    res.status(200).send({respuesta: "[OK]", mensaje: "Se agrego correctamente mas cantidad al producto del carrito"});
                } else {
                    carrito.productos.push({idProducto: productoNuevo.idProducto, cantidad: productoNuevo.cantidad});
                    res.status(200).send({respuesta: "[OK]", mensaje: "Producto agregado al carrito correctamente"});
                }
                await carritoModel.findByIdAndUpdate(cid, carrito);
            });
            res.status(200).send({respuesta: "[OK]", mensaje: "Se elimino el producto del carrito"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido encontrar el carrito"});
        }
    } catch (error) {
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
})

cartRouter.put ("/:cid/productos/:pid", async (req,res) => {
    const {cid,pid} = req.params;
    const {cantidad} = req.body;

    try {
        const carrito = await carritoModel.findById(cid);

        if(carrito) {
            const producto = await productoModel.findById(pid);

            if(producto) {
                const indiceProducto = carrito.productos.findIndex(producto => producto.idProducto._id.toString() === pid);
                carrito.productos[indiceProducto].cantidad = cantidad;
                await carritoModel.findByIdAndUpdate(cid, carrito);
                res.status(200).send({respuesta: "[OK]", mensaje: "Se agrego correctamente mas cantidad al producto del carrito"});
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


cartRouter.delete ("/:cid/productos/:pid", async (req,res) => {
    const {cid,pid} = req.params;
        
    try {
        const carrito = await carritoModel.findById(cid);
        if(carrito) {
            const producto = await productoModel.findById(pid);
            if(producto) {
                const indiceProducto = carrito.productos.findIndex(producto => producto.idProducto._id.toString() === pid);
                carrito.productos.splice(indiceProducto,1);
                await carritoModel.findByIdAndUpdate(cid,carrito);
                res.status(200).send({respuesta: "[OK]", mensaje: "Se elimino el producto del carrito"});
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

cartRouter.delete ("/:cid/", async (req,res) => {
    const {cid} = req.params;
     
    try {
        const carrito = await carritoModel.findById(cid);
        if(carrito) {
            carrito.productos = [];
            await carritoModel.findByIdAndUpdate(cid,carrito);
            res.status(200).send({respuesta: "[OK]", mensaje: "Se ha vaciado el carrito"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido encontrar el carrito"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
})




export default cartRouter;