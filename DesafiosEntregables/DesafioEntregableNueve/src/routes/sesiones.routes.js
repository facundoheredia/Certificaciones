import { Router } from "express";
import passport from "passport";
import { passportError,authorization } from "../utils/messagesError.js";
import { salir, ingreso, registro } from "../controllers/session.controller.js";

const sesionRouter = Router();

sesionRouter.post("/ingreso", passport.authenticate("ingreso"), ingreso);
sesionRouter.post("/registro", passport.authenticate("registro"), registro);
sesionRouter.get("/salir", salir);

sesionRouter.get("/current", passportError("jwt"), authorization("user"), (req,res) => {
    res.send(req.user)
})

export default sesionRouter;