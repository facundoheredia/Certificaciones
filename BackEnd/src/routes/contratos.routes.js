import { Router } from "express";
import {obtenerContratos, obtenerContratoPorExpediente, crearContrato, modificarContratoPorExpediente} from "../controllers/contratos.controller.js";

const contratosRouter = Router ();

contratosRouter.get("/", obtenerContratos);
contratosRouter.post("/", crearContrato);
contratosRouter.get("/:expediente", obtenerContratoPorExpediente);
contratosRouter.put("/:expediente", modificarContratoPorExpediente);

export default contratosRouter;