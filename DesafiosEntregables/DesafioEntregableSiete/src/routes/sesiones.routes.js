import { Router } from "express";
import passport from "passport";
import { passportError,authorization } from "../utils/messagesError.js";
import { logOut, login, signUp } from "../controller/session.controller.js";

const sesionRouter = Router();

sesionRouter.post("/login", passport.authenticate("login"), login);
sesionRouter.post("/signUp", passport.authenticate("signUp"), signUp);
sesionRouter.get("/logout", logOut);

sesionRouter.get("/github", passport.authenticate("github", {scope: ["user:email"]}), async (req,res) => {
  res.status(200).send({mensaje: "usuario registrado"});
})

sesionRouter.get("/githubCallback", passport.authenticate("github"), async (req,res) => {
  req.session.user = req.user;

  res.status(200).send({mensaje: "usuario logueado"});
})

sesionRouter.get("/current", passportError("jwt"), authorization("user"), (req,res) => {
    res.send(req.user)
})

export default sesionRouter;