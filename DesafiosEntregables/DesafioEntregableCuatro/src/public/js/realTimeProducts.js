const socketCliente = io();

socketCliente.on("productosEnTiempoReal",async (productosActualizados) => {
    actualizarLista (productosActualizados);
});

function actualizarLista (productosActualizados) {
    const bodyTablaRealTimeProducts = document.getElementById("tablaRealTimeProducts");
    let listaDeProductos = " ";

    productosActualizados.forEach(element => {
        listaDeProductos +=
        `<tr>
        <th scope="row">${element.id}</th>
        <td>${element.title}</td>
        <td>${element.description}</td>
        <td>$ ${element.price}</td>
        <td>${element.category}</td>
        <td>${element.code}</td>
        <td>${element.stock}</td>
        <td><div class="badge text-bg-success d-flex justify-content-center align-items-center"><p class="text-uppercase">${element.status}</p></div></td>
      </tr>`
    });

    bodyTablaRealTimeProducts.innerHTML = listaDeProductos;
}