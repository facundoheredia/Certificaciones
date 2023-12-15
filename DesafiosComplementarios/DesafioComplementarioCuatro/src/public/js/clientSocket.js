import { actualizarListaProductos, agregarProductoEnCarrito, actualizarListaCarritos, verProductosEnCarrito,actualizarListaDeMensajes,actualizarListaDeProductosEnCarrito } from "./funcionesHtml.js";

const socketCliente = io();

// MENSAJES
const socketClienteCargarMensajes = () => {
    socketCliente.on("mensajes",async mensajesActualizados => {
        actualizarListaDeMensajes (mensajesActualizados);
    });
}

const socketClienteEnviarMensaje = (nuevoMensaje) => {
    socketCliente.emit("EnviarNuevoMensaje",nuevoMensaje);
}

// PRODUCTOS
const socketClienteCargarProductos = () => {
    socketCliente.on("productos", async productos => {
        actualizarListaProductos (productos);
    })
}

const socketClienteAgregarProducto = () => {
    socketCliente.on("productos", async productos => {
        agregarProductoEnCarrito (productos);
    })
}

const socketClienteNuevoProducto = (nuevoProducto) => {
    socketCliente.emit("nuevoProducto",nuevoProducto);
}

const socketClienteAgregarProductoAlCarrito = (producto) => {
    socketCliente.emit("agregarProductoAlCarrito",producto);
}

const socketClienteEliminarProducto = (idProducto) => {
    socketCliente.emit("eliminarProducto",idProducto);
}

const socketClienteModificarEstadoDelProducto = (productoEstadoModificado) => {
    socketCliente.emit("modificarEstadoProducto",productoEstadoModificado);
}

// CARRITO
const socketClienteCargarCarritos = () => {
    socketCliente.on("carritos",async carritosActualizados => {
        actualizarListaCarritos (carritosActualizados);
        verProductosEnCarrito(carritosActualizados);
    });
}

const socketClienteNuevoCarrito = () => {
    socketCliente.emit("nuevoCarrito");
}

const socketClienteNuevoProductoEnCarrito = (nuevoProductoEnCarrito) => {
    socketCliente.emit("nuevoProductoEnCarrito",nuevoProductoEnCarrito);
}

const socketClienteEliminarProductoDelCarrito = (eliminarProductoDeCarrito) => {
    socketCliente.emit("eliminarProductoDeCarrito",eliminarProductoDeCarrito);
}

const socketClienteVerProductosEnCarrito = (carrito) => {
    socketCliente.emit("verDetalleCarrito",carrito);
} 

// DETALLES CARRITO
const socketClienteMostrarProductosEnCarrito = () => {
    console.log("hola socket recibiendo carrito");
    socketCliente.on("carritoDetalle", async productos => {
        actualizarListaDeProductosEnCarrito (productos);
        console.log("el server socket recibe este carrito");
        console.log(carrito);
    })
}

export { socketClienteCargarMensajes, socketClienteCargarProductos, socketClienteAgregarProductoAlCarrito, socketClienteNuevoProducto, socketClienteAgregarProducto, socketClienteEliminarProducto, socketClienteModificarEstadoDelProducto, socketClienteCargarCarritos, socketClienteNuevoCarrito,socketClienteNuevoProductoEnCarrito,socketClienteEliminarProductoDelCarrito,socketClienteVerProductosEnCarrito,socketClienteEnviarMensaje,socketClienteMostrarProductosEnCarrito };