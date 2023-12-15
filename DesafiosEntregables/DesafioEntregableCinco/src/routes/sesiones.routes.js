import { Router } from "express";
import { usuarioModel } from "../models/users.models.js";

const sesionRouter = Router();

sesionRouter.post("/login", async (req,res) => {
    const {email, contrasenia} = req.body;

    console.log(email)
    console.log(contrasenia)

    try {
        if(req.session.login) {
            res.status(200).send({respuesta: "Login ya existente"});
        }

        const usuario = await usuarioModel.findOne({email: email});

        if(usuario) {
            if(usuario.contrasenia == contrasenia) {
                req.session.login = true;
                res.status(200).send({respuesta: "Login correcto", mensaje: usuario});
            } else {
                res.status(401).send({respuesta:"[ERROR]", mensaje: `La contraseña ${contrasenia} no es correcta`});
            }
        } else {
            res.status(400).send({respuesta: "No se encontro el usuario", mensaje: usuario})
        }
    } catch (error){
        res.status(400).send({error:"[ERROR]", mensaje: `Este es el error detectado: ${error}`})
    }
})

sesionRouter.get("/logout", async (req,res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.status(200).send({resultado: "Usuario deslogueado"})
})

export default sesionRouter;