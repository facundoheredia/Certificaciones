import { Router } from "express";
import { passportError,authorization } from "../utils/messagesError.js";
import { deleteUser, getUser, getUsers, putUser } from "../controller/users.controller.js";

const usuarioRouter = Router ();

usuarioRouter.get ("/", passportError("jwt"), authorization("admin"), getUsers);
usuarioRouter.get ("/:uid", passportError("jwt"), authorization("user"), getUser);
usuarioRouter.put ("/:uid", passportError("jwt"), authorization("user"), putUser);
usuarioRouter.delete ("/:uid", passportError("jwt"), authorization("user"), deleteUser);

export default usuarioRouter;