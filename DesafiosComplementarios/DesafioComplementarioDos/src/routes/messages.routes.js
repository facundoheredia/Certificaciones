import { Router } from "express";
import {mensajeModel} from "../models/messages.models.js";

const mensajeRouter = Router ();

mensajeRouter.get("/", async (req,res) => {
    try {
        const mensajes = await mensajeModel.find();

        if(mensajes) {
            res.status(200).send({respuesta: "[OK]", mensaje: mensajes});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se han podido encontrar los mensajes"});
        }
    } catch (error) {
        res.status(400).send({respuesta: "[ERROR]", mensaje: "No se han podido cargar los mensajes"});
    }
})

mensajeRouter.post ("/", async (req,res) => {
    const {email, mensaje} = req.body;

    try {
        const respuesta = await mensajeModel.create({email, mensaje});

        if(respuesta) {
            res.status(200).send({respuesta: "[OK]", mensaje: "Mensaje creado correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido crear el mensaje"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
})

export default mensajeRouter;