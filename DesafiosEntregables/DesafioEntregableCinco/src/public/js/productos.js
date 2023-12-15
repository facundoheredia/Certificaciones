
import { socketClienteCargarProductos, socketClienteAgregarProducto } from "./clientSocket.js";
import { eventoBotonSubmitCrearProducto,eventoBotonSubmitEliminarProducto, eventoBotonSubmitModificarProducto } from "./eventos.js";

socketClienteCargarProductos();
socketClienteAgregarProducto();
eventoBotonSubmitCrearProducto();
eventoBotonSubmitEliminarProducto();
eventoBotonSubmitModificarProducto();