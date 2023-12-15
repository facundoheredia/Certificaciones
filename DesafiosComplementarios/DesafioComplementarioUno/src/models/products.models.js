import { Schema, model } from "mongoose";

const productoSchema = new Schema ({
    titulo: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    precio: {
        type: Number,
        require: true
    },
    codigo: {
        type: String,
        require: true,
        unique: true
    },
    stock: {
        type: Number,
        require: true
    },
    categoria: {
        type: String,
        require: true
    },
    miniatura: [],
    estado: {
        type: Boolean,
        default: true
    },
}); 

export const productoModel = model("productos",productoSchema);