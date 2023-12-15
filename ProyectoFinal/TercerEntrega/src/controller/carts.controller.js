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
            res.status(200).send({respuesta: "[OK]", mensaje: carrito});
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

    console.log(`1 - Este carrito [${cid}]`)
    console.log(`2 - Este producto [${pid}]`)
    console.log(`3 - Esta cantidad [${cantidad}]`)
    
    try {
        const carrito = await carritoModel.findById(cid);

        console.log(`4 - Esta carrito encontrado [${carrito}]`)

        if(carrito) {
            const producto = await productoModel.findById(pid);

            console.log(`5 - Este producto encontrado [${producto}]`)

            if(producto) {

                console.log(`6 - Entre al producto encontrado`)

                const indiceProducto = carrito.productos.findIndex(producto => producto.idProducto._id.toString() === pid);

                console.log(`7 - Este indice encontrado del producto en el carrito [${indiceProducto}]`)
                
                if(indiceProducto != -1) {
                    console.log(`8 - El producto existe en el carrito y le agrego cantidad`)

                    carrito.productos[indiceProducto].cantidad += cantidad;
                    res.status(200).send({respuesta: "[OK]", mensaje: "Se agrego correctamente mas cantidad al producto del carrito"});
                } else {
                    console.log(`9 - El producto NO existe en el carrito y lo agrego`)

                    carrito.productos.push({idProducto: pid, cantidad: cantidad});
                    res.status(200).send({respuesta: "[OK]", mensaje: "Producto agregado al carrito correctamente"});
                }

                console.log(`10 - Actualizo el carrito`)

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

    try {
        const carrito = await carritoModel.findById(cid);
        if (carrito) {
            //Comprobar stocks de los productos guardados en el carrito
                //Si esta correcta la cantidad pasarlo a la compra, si no, no se agrega a la compra
                //Obtener el dato del mail del comprador
                //Obtener el monto total de la compra (precio unitario x cantidad y sumar subtotales de cada producto)
                //Si esta todo ok crear el ticket con el ID de mongo, el codigo unico, fecha de la compra, enviarle el dato del mail del usuario comprador y productos
                    //Si se genera el ticket OK, eliminar del carrito los productos comprados y dejar los que no se pudieron comprar por falta de stocks
                    //TAMBIEN RESTAR STOCK A LOS PRODUCTOS COMPRADOS 
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido encontrar el carrito"});
        }
    } catch (error) {
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
}