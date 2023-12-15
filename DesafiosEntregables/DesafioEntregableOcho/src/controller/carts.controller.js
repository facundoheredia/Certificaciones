import { carritoModel } from "../models/carts.models.js";
import { productoModel } from "../models/products.models.js";
import { ticketModel } from "../models/tickets.models.js";

export const getCarritos = async (req,res) => {
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
}

export const getCarrito = async (req,res) => {
    const {cid} = req.params;

    try {
        const carrito = await carritoModel.findById(cid);

        if(carrito) {
            const totalMonto = carrito.productos.reduce((acumulador, producto) => acumulador + (producto.cantidad * producto.precio), 0);
            res.status(200).send({respuesta: "[OK]", mensaje: carrito, totalMonto});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido encontrar el carrito"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
}

export const postProductoEnCarrito = async (req,res) => {
    const {cid,pid} = req.params;
    const {cantidad} = req.body;

    try {
        const carrito = await carritoModel.findById(cid);
        if(carrito) {
            const producto = await productoModel.findById(pid);
            if(producto) {
                const indiceProducto = carrito.productos.findIndex(producto => producto.idProducto._id.toString() === pid);             
                if(indiceProducto != -1) {
                    carrito.productos[indiceProducto].cantidad += cantidad;
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
}

export const putCarrito = async (req,res) => {
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
}

export const putProductosEnCarrito = async (req,res) => {
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
}

export const deleteProductosEnCarrito = async (req,res) => {
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
}

export const deleteCarrito = async (req,res) => {
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
}

export const postCompra = async (req,res) => {
    const {cid} = req.params;
    const emailComprador = req.user.email;
  
    try {
        const carrito = await carritoModel.findById(cid);
        if (carrito) {        
            const productosVerificados = await verificarStock(carrito.productos);
            const montoTotalCompra = calcularMontoCompra(productosVerificados);
            const nuevoTicket = await ticketModel.create({montoCompra: montoTotalCompra,productos: productosVerificados, comprador:emailComprador});

            if(nuevoTicket) {
                res.status(200).send({respuesta: "[OK]", mensaje: `Se ha generado correctamente el ticket, los productos que no se pudieron procesar se han eliminado del carrito. Este es su codigo del ticket generado [${nuevoTicket.codigoCompra}]`});
            } else {
                res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido generar el ticket"});
            }
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido encontrar el carrito"});
        }
    } catch (error) {
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
}

const verificarStock = async (productosEnCarrito) => {

    let productosVerificados = [];

    for (let productoEnCarrito of productosEnCarrito) {
        let productoEnDeposito = await productoModel.findById(productoEnCarrito.idProducto._id);

        if(productoEnDeposito) {
            if(productoEnCarrito.cantidad <= productoEnDeposito.stock) {
                productosVerificados.push(productoEnCarrito);
            }
        }
    }

    return productosVerificados;
}

const calcularMontoCompra = (productos) => {
    let totalCompra = 0;
      
    for (let producto of productos) {
        totalCompra += parseFloat(producto.idProducto.precio) * parseFloat(producto.cantidad);
    }

    return totalCompra;
}