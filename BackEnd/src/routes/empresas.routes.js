import { Router } from "express";
import { borrarEmpresaPorCuit, crearEmpresa, modificarEmpresaPorCuit, obtenerEmpresaPorCuit, obtenerEmpresas } from "../controllers/empresas.controller.js";

const empresasRouter = Router ();

empresasRouter.get("/", obtenerEmpresas);
empresasRouter.get("/:cuit", obtenerEmpresaPorCuit);
empresasRouter.put("/:cuit", modificarEmpresaPorCuit);
empresasRouter.put("/:cuit", borrarEmpresaPorCuit);
empresasRouter.post("/", crearEmpresa);

export default empresasRouter;