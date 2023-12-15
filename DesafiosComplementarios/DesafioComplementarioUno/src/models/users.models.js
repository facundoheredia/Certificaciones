import { Schema, model } from "mongoose";

const usuarioSchema = new Schema ({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    edad: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    contrasenia: {
        type: String,
        require: true
    }
}); 

export const usuarioModel = model("usuarios",usuarioSchema);