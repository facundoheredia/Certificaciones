import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messagesError.js";


const sesionRouter = Router();

sesionRouter.post("/login", passport.authenticate("login"), async (req,res) => {
   try {
    if(!req.user) {
        res.status(401).send({mensaje: "usuario invalido"});
    } else {
        req.session.user = {
            nombre: req.user.nombre,
            apellido: req.user.apellido,
            edad: req.user.edad,
            email: req.user.email
        }
        res.status(200).send({payload: req.user});
    }
   } catch (error) {
    res.status(500).send({mensaje: `[ERROR] - error al iniciar sesion ${error}`});
   }
})

sesionRouter.post("/signUp", passport.authenticate("signUp"), async (req,res) => {
    try {
     if(!req.user) {
         res.status(400).send({mensaje: "usuario ya existente"});
     } 
    
     res.status(200).send({mensaje: "usuario registrado"});
    } catch (error) {
     res.status(500).send({mensaje: `[ERROR] - error al registrar usuario ${error}`});
    }
 })

sesionRouter.get("/github", passport.authenticate("github", {scope: ["user:email"]}), async (req,res) => {
  res.status(200).send({mensaje: "usuario registrado"});
})

sesionRouter.get("/githubCallback", passport.authenticate("github"), async (req,res) => {
  req.session.user = req.user;

  res.status(200).send({mensaje: "usuario logueado"});
})

sesionRouter.get("/logout", async (req,res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.status(200).send({resultado: "Usuario deslogueado"})
})

sesionRouter.get("/testJWT", passport.authenticate("jwt",{session:false}), (req,res) => {
    res.send(req.user);
})

sesionRouter.get("/current", passportError("jwt"), authorization("user"), (req,res) => {
    res.send(req.user);
})

export default sesionRouter;