import { Server } from "socket.io";
import { productManagerServer } from "../routes/products.routes.js";
import { httpServer } from "./ServerConfig.js";


export function serverSocketStart () {
    const socketServer = new Server (httpServer);
    socketServer.on("connection",async (socket) => {
        console.log(`[CLIENTE CONECTADO CON ID ${socket.id}]`)
        const productosActualizados = await productManagerServer.getProducts()
    
        socket.emit("productosEnTiempoReal",productosActualizados);
    
        socket.on("nuevoProducto",async nuevoProducto => {
            await productManagerServer.addProduct(nuevoProducto);
            socket.emit("productosEnTiempoReal", productosActualizados);
        })

        socket.on("eliminarProducto",async idProducto => {
            await productManagerServer.deleteProduct(idProducto);
            socket.emit("productosEnTiempoReal", productosActualizados);
        })
    })
}