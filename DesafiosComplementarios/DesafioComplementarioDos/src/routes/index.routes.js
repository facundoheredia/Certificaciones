import productsRouter from "../routes/products.routes.js";
import usersRouter from "../routes/users.routes.js";
import cartsRouter from "../routes/carts.routes.js";
import mensajeRouter from "../routes/messages.routes.js";
import sesionRouter from "../routes/sesiones.routes.js";
import viewRouter from "../routes/views.routes.js";
import {Router} from "express";

const router = Router();

router.use("/api/productos",productsRouter);
router.use("/api/usuarios",usersRouter);
router.use("/api/carritos",cartsRouter);
router.use("/api/mensajes",mensajeRouter);
router.use("/api/sesion",sesionRouter);
router.use("/views",viewRouter);
router.use("/views",express.static(path.join(__dirname,"/public")));

export default router;