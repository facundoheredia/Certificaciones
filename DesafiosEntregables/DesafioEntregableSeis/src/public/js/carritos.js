import { socketClienteCargarCarritos } from "./clientSocket.js";
import { eventoBotonSubmitCrearCarrito, eventoBotonSubmitAgregarProductoAlCarrito,eventoBotonSubmitEliminarProductoDeCarrito } from "./eventos.js";

socketClienteCargarCarritos();
eventoBotonSubmitCrearCarrito();
eventoBotonSubmitAgregarProductoAlCarrito();
eventoBotonSubmitEliminarProductoDeCarrito();