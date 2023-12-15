import { Router } from "express";
import { borrarUsuarioPorLegajo, obtenerUsuarioPorLegajo, obtenerUsuarios, modificarUsuarioPorLegajo } from "../controllers/usuarios.controller.js";

const usuariosRouter = Router ();

usuariosRouter.get ("/", obtenerUsuarios);
usuariosRouter.get ("/:usuarioLegajo", obtenerUsuarioPorLegajo);
usuariosRouter.put ("/:usuarioLegajo", modificarUsuarioPorLegajo);
usuariosRouter.delete ("/:usuarioLegajo", borrarUsuarioPorLegajo);

export default usuariosRouter;