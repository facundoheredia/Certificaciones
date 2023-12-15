const socketCliente = io();

console.log("hola estoy en js delete products");

const eliminateProductForm = document.getElementById("eliminateProductForm");
const inputIdProducto = document.getElementById("idProducto");

eliminateProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const idProducto = parseInt(inputIdProducto.value);
    console.log(idProducto)
    socketCliente.emit("eliminarProducto",idProducto);
    e.target.reset();
})