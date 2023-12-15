import { Schema,model } from "mongoose";

const mensajeSchema = new Schema ({
    email: {
        type: String,
        require: true
    },
    mensaje: {
        type: String,
        require: true
    },
    fechaDeEnvio: {
        type: Date,
        default: Date.now
    }
});

export const mensajeModel = model ("mensajes", mensajeSchema);