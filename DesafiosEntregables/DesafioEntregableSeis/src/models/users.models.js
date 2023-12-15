import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const usuarioSchema = new Schema ({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true,
        index: true
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
    },
    rol: {
        type: String,
        default: "user"
    }
}); 

usuarioSchema.plugin(paginate);

export const usuarioModel = model("usuarios",usuarioSchema);