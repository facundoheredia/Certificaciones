import { Router } from "express";
import { passportError,authorization } from "../utils/messagesError.js";
import { getMessages, postMessages } from "../controller/messages.controller.js";

const mensajeRouter = Router ();

mensajeRouter.get("/", passportError("jwt"), authorization("user"), getMessages);
mensajeRouter.post ("/", passportError("jwt"), authorization("user"), postMessages);

export default mensajeRouter;