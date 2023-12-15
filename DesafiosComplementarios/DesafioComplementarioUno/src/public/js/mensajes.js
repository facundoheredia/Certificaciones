const socketCliente = io();
const crearMensajeForm = document.getElementById("crearMensajeForm");

socketCliente.on("mensajes",async (mensajesActualizados) => {
    actualizarLista (mensajesActualizados);
});

function actualizarLista (mensajesActualizados) {
    const bodyMensajes = document.getElementById("listaChat");
    let listaDemensajes;

    if(mensajesActualizados.length !== 0) {
        listaDemensajes= " ";

        mensajesActualizados.forEach(mensaje => {
            listaDemensajes +=
            `<div class="card tarjetasChat bg-secondary-subtle mb-2 shadow">
                    <div class="card-body">
                        <p class="pt-2 ps-2 text-start fw-medium text-decoration-underline">Enviado por: ${mensaje.email}</p>
                        <p class="ps-2 text-start">${mensaje.mensaje}</p>
                        <p class="pb-2 pe-2 text-body-secondary text-end horaChatEnviado">Hora: ${mensaje.fechaDeEnvio}</p>
                    </div>
            </div>`
        });
    } else {
        listaDemensajes = "<p>No hay ningun mensaje para mostrar</p>";
    }

    bodyMensajes.innerHTML = listaDemensajes;
}

crearMensajeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const nuevoMensaje = Object.fromEntries(formData);

    socketCliente.emit("EnviarNuevoMensaje",nuevoMensaje);

    e.target.reset();
})