const socketCliente = io();

const createProductForm = document.getElementById("createProductForm");

createProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nuevoProducto = Object.fromEntries(formData);
    
    socketCliente.emit("nuevoProducto",nuevoProducto);
    e.target.reset();
})