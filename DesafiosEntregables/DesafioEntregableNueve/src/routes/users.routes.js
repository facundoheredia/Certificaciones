import { Router } from "express";
//import { passportError,authorization } from "../utils/messagesError.js";
import { deleteUser, getUser, getUsers, putUser } from "../controller/users.controller.js";

const usuarioRouter = Router ();

usuarioRouter.get ("/", getUsers);
usuarioRouter.get ("/:uid", getUser);
usuarioRouter.put ("/:uid", putUser);
usuarioRouter.delete ("/:uid", deleteUser);

export default usuarioRouter;


/*
usuarioRouter.get ("/", passportError("jwt"), authorization("admin"), getUsers);
usuarioRouter.get ("/:uid", passportError("jwt"), authorization("user"), getUser);
usuarioRouter.put ("/:uid", passportError("jwt"), authorization("user"), putUser);
usuarioRouter.delete ("/:uid", passportError("jwt"), authorization("user"), deleteUser);
*/