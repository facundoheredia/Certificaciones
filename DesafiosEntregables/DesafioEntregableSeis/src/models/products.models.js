import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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
        require: true,
        index: true
    },
    miniatura: [],
    estado: {
        type: Boolean,
        default: true
    },
}); 

productoSchema.plugin(mongoosePaginate);

export const productoModel = model("productos",productoSchema);