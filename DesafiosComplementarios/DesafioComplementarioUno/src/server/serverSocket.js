import { Server } from "socket.io";
import { httpServer } from "./serverConfig.js";
import { productoModel } from "../models/products.models.js";
import { mensajeModel } from "../models/messages.models.js";


export function serverSocketIniciar () {
    const socketServer = new Server (httpServer);

    socketServer.on("connection",async (socket) => {
        console.log(`[CLIENTE CONECTADO CON ID ${socket.id}]`);

        const productos = await productoModel.find();
        const mensajes = await mensajeModel.find();
    
        socket.emit("productos", productos);
        socket.emit("mensajes", mensajes);
        
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

        socket.on("EnviarNuevoMensaje", async nuevoMensaje => {
            const {email, mensaje} = nuevoMensaje;

            await mensajeModel.create({email,mensaje});
            const mensajesActualizadios = await mensajeModel.find();
            socket.emit("mensajes",mensajesActualizadios);
        })
    })
}




