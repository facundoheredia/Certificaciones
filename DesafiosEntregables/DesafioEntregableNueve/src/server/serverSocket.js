import { Server } from "socket.io";
import { httpServer } from "./serverConfig.js";
import { productoModel } from "../models/products.models.js";
import { carritoModel } from "../models/carts.models.js";

export function serverSocketIniciar () {
    const socketServer = new Server (httpServer);

    socketServer.on("connection",async (socket) => {
        console.log(`[CLIENTE CONECTADO CON ID ${socket.id}]`);

        const productos = await productoModel.find();
        const carritos = await carritoModel.find();
    
        socket.emit("productos", productos);
        socket.emit("carritos", carritos);
        
        socket.on("nuevoProducto",async nuevoProducto => {
            const {titulo, descripcion, precio, codigo, stock, categoria} = nuevoProducto;
            await productoModel.create({titulo, descripcion, precio, codigo, stock, categoria});
            const productosActualizados = await productoModel.find();
            socket.emit("productos", productosActualizados);
        });

        socket.on("eliminarProducto",async idProducto => {
            await productoModel.findByIdAndDelete(idProducto);
            const productosActualizados = await productoModel.find();
            socket.emit("productos", productosActualizados);
        });

        socket.on("modificarEstadoProducto",async productoEstadoModificado => {
            const {idProductoEstadoModificado, estadoProductoEstadoModificado} = productoEstadoModificado;
            let estado = estadoProductoEstadoModificado;

            if(estado === "Activado") {
                estado = true;
            } else {
                estado = false;
            }

            await productoModel.findByIdAndUpdate(idProductoEstadoModificado,{estado});
            const productosActualizados = await productoModel.find();
            socket.emit("productos", productosActualizados);
        });

        socket.on("nuevoCarrito", async () => {
            const carritoExistente = await carritoModel.find();

            if(carritoExistente) {
                console.log("Ya existe un carrito, no se puede crear otro carrito")
            } else {
                await carritoModel.create({});
            }
            const carritosActualizados = await carritoModel.find();
            socket.emit("carritos", carritosActualizados);
        });

        socket.on("nuevoProductoEnCarrito", async nuevoProductoEnCarrito => {
            const {idCarrito,idProducto, cantidad} = nuevoProductoEnCarrito;
            
            const carritoExistente = await carritoModel.findById(idCarrito);

            if(carritoExistente) {
                const productoExistente = await productoModel.findById(idProducto);

                if(productoExistente) {
                    const indiceProducto = carritoExistente.productos.findIndex(producto => producto.idProducto === idProducto);
                    if(indiceProducto != -1) {
                        carritoExistente.productos[indiceProducto].cantidad = cantidad;
                    } else {
                        carritoExistente.productos.push({idProducto: idProducto, cantidad: cantidad});
                    }
                    await carritoModel.findByIdAndUpdate(idCarrito, carritoExistente);
                } else {
                    console.log("El producto no existe");
                }
            } else {
                console.log("Carrito no existe");
            }
           
            const carritosActualizados = await carritoModel.find();
            socket.emit("carritos", carritosActualizados);
        });

        socket.on("eliminarProductoDeCarrito", async eliminarProductoDeCarrito => {
            const {idCarritoEliminarProductoEnCarrito,idProductoEliminarProductoEnCarrito} = eliminarProductoDeCarrito;

            const carritoExistente = await carritoModel.findById(idCarritoEliminarProductoEnCarrito);

            if(carritoExistente) {
                const productoExistente = await productoModel.findById(idProductoEliminarProductoEnCarrito);

                if(productoExistente) {
                    const carritoModificado = carritoExistente.productos.filter(producto => producto.idProducto !== idProductoEliminarProductoEnCarrito);
                    await carritoModel.findByIdAndUpdate(idCarritoEliminarProductoEnCarrito, {productos: carritoModificado});
                } else {
                    console.log("El producto no existe");
                }
            } else {
                console.log("Carrito no existe");
            }
           
            const carritosActualizados = await carritoModel.find();
            socket.emit("carritos", carritosActualizados);
        });

        socket.on("agregarProductoAlCarrito", async productoNuevo => {
            const arrayCarritos = await carritoModel.find();
            const carritoExistente = await carritoModel.findById(arrayCarritos[0]._id);
            if(carritoExistente) {
                const productoExistente = await productoModel.findById(productoNuevo._id);
                if(productoExistente) {
                    const indiceProducto = carritoExistente.productos.findIndex(producto => producto.idProducto._id.toString() === productoNuevo._id);

                    if(indiceProducto != -1) {
                        carritoExistente.productos[indiceProducto].cantidad = 1;
                    } else {
                        carritoExistente.productos.push({idProducto: productoExistente._id, cantidad: 1});
                    }
                    await carritoModel.findByIdAndUpdate(carritoExistente._id, carritoExistente);
                } else {
                    console.log("El producto no existe");
                }
            } else {
                console.log("Carrito no existe");
            }
           
            const carritosActualizados = await carritoModel.find();
            socket.emit("carritos", carritosActualizados);
        });
        
        socket.on("verDetalleCarrito", async carrito => {

            const carritoEncontrado = await carritoModel.findById(carrito._id).lean();

            const productosEnCarrito = carritoEncontrado.productos;

            socket.emit("carritoDetalle", productosEnCarrito);
            console.log("el server socket recibe este carrito");
            console.log(productosEnCarrito)
        })
    })
}




