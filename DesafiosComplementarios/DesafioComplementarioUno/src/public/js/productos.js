const socketCliente = io();

const createProductForm = document.getElementById("createProductForm");
const eliminateProductForm = document.getElementById("eliminateProductForm");
const modificarEstadoProductoForm = document.getElementById("modificarEstadoProductoForm");
const inputIdProducto = document.getElementById("idProducto");

socketCliente.on("productos",async (productosActualizados) => {
    actualizarLista (productosActualizados);
});

createProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nuevoProducto = Object.fromEntries(formData);

    socketCliente.emit("nuevoProducto",nuevoProducto);

    e.target.reset();
})

eliminateProductForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const idProducto = inputIdProducto.value;
    socketCliente.emit("eliminarProducto",idProducto);
    
    e.target.reset();
})

modificarEstadoProductoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const productoEstadoModificado = Object.fromEntries(formData);

    socketCliente.emit("modificarEstadoProducto",productoEstadoModificado);
    
    e.target.reset();
})

function actualizarLista (productosActualizados) {
    const bodyProductos = document.getElementById("tablaProductos");
    let listaDeProductos = " ";

    productosActualizados.forEach(producto => {
        let colorFondoTitulo;
        let colorFondoTarjeta;

        if(producto.estado) {
            colorFondoTitulo = "text-bg-success";
            colorFondoTarjeta = "bg-body-secondary";
        } else {
            colorFondoTitulo = "text-bg-danger";
            colorFondoTarjeta = "bg-danger-subtle";
        }

        listaDeProductos +=
        `<div class="col pb-4">
            <div class="card ${colorFondoTarjeta}" style="width: 18rem;">
                <div class="card-body p-2">
                    <div class="badge ${colorFondoTitulo} text-bg-success d-flex justify-content-center align-items-center p-2"><h5 class="card-title text-center text-uppercase">${producto.titulo}</h5></div>
                </div>
                <div class="card-body">
                    <p class="card-text ps-2 textoProducto">Descripcion: ${producto.descripcion}</p>
                </div>
                <ul class="ps-2 list-group textoProducto">
                    <li class="list-group-item bg-transparent">Precio: $ ${producto.precio}</li>
                    <li class="list-group-item bg-transparent">Categoria: ${producto.categoria}</li>
                    <li class="list-group-item bg-transparent">Codigo: ${producto.codigo}</li>
                    <li class="list-group-item bg-transparent">Cantidad: ${producto.stock}</li>
                    <li class="list-group-item bg-transparent fw-medium">ID: ${producto._id}</li>
                </ul>
            </div>
        </div>`
    });

    bodyProductos.innerHTML = listaDeProductos;
}
