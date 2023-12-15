import { socketClienteEliminarProducto, socketClienteAgregarProductoAlCarrito, socketClienteNuevoProducto, socketClienteModificarEstadoDelProducto, socketClienteNuevoCarrito, socketClienteNuevoProductoEnCarrito,socketClienteEliminarProductoDelCarrito,socketClienteVerProductosEnCarrito,socketClienteEnviarMensaje } from "./clientSocket.js";

const eventoBotonAgregarProductoAlCarrito = (producto) => {
    let botonAgregarProductoAlCarrito = document.getElementById(`botonDetallesProducto-${producto._id}`);

    botonAgregarProductoAlCarrito.addEventListener("click", function() {
        if(producto.estado) {
            socketClienteAgregarProductoAlCarrito(producto);
            console.log("Producto agregado al carrito");
        } else {
            console.log("El producto no se encuentra activado");
        }
    })
}

const eventoBotonSubmitCrearProducto = () => {
    const createProductForm = document.getElementById("createProductForm");

    createProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const nuevoProducto = Object.fromEntries(formData);
    
        socketClienteNuevoProducto(nuevoProducto);
    
        e.target.reset();
    })
}

const eventoBotonSubmitEliminarProducto = () => {
    const eliminateProductForm = document.getElementById("eliminateProductForm");
    const inputIdProducto = document.getElementById("idProducto");

    eliminateProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const idProducto = inputIdProducto.value;

        socketClienteEliminarProducto(idProducto)
        
        e.target.reset();
    })
}

const eventoBotonSubmitModificarProducto = () => {
    const modificarEstadoProductoForm = document.getElementById("modificarEstadoProductoForm");

    modificarEstadoProductoForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const productoEstadoModificado = Object.fromEntries(formData);
    
        socketClienteModificarEstadoDelProducto(productoEstadoModificado);
        
        e.target.reset();
    })
}

const eventoBotonSubmitCrearCarrito = () => {
    const crearCarritoForm = document.getElementById("crearCarritoForm");

    crearCarritoForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        socketClienteNuevoCarrito();
    
        e.target.reset();
    })
}

const eventoBotonSubmitAgregarProductoAlCarrito = () => {
    const agregarProductoEnCarritoForm = document.getElementById("agregarProductoEnCarritoForm");
    
    agregarProductoEnCarritoForm.addEventListener("submit",(e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const nuevoProductoEnCarrito = Object.fromEntries(formData);
    
        socketClienteNuevoProductoEnCarrito(nuevoProductoEnCarrito);
    
        e.target.reset();
    })
}

const eventoBotonSubmitEliminarProductoDeCarrito = () => {
    const eliminarProductoDeCarritoForm = document.getElementById("eliminarProductoDeCarritoForm");
    
    eliminarProductoDeCarritoForm.addEventListener("submit",(e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const eliminarProductoDeCarrito = Object.fromEntries(formData);
    
        socketClienteEliminarProductoDelCarrito(eliminarProductoDeCarrito),
    
        e.target.reset();
    })
}

const eventoBotonVerProductosEnCarrito = (carrito) => {
    let botonVerDetallesProductosEnCarrito = document.getElementById(`botonDetallesCarrito-${carrito._id}`);

    botonVerDetallesProductosEnCarrito.addEventListener("click", function() {
        
        socketClienteVerProductosEnCarrito(carrito);
    })
}

const eventoBotonSubmitEnviarMensaje = () => {
    const crearMensajeForm = document.getElementById("crearMensajeForm");

    crearMensajeForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const nuevoMensaje = Object.fromEntries(formData);

        socketClienteEnviarMensaje(nuevoMensaje);

        e.target.reset();
})
}

const eventoBotonSubmitIngresar = () => {
    const ingresarForm = document.getElementById("loginForm");

    ingresarForm.addEventListener("submit", async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const cuentaIngresando = Object.fromEntries(formData);
    
    
        e.target.reset();
    })
}

export {eventoBotonAgregarProductoAlCarrito, eventoBotonSubmitCrearProducto, eventoBotonSubmitEliminarProducto, eventoBotonSubmitModificarProducto, eventoBotonSubmitCrearCarrito, eventoBotonSubmitAgregarProductoAlCarrito, eventoBotonSubmitEliminarProductoDeCarrito, eventoBotonVerProductosEnCarrito, eventoBotonSubmitEnviarMensaje, eventoBotonSubmitIngresar};