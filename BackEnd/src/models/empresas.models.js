import { Schema, model } from "mongoose";

const empresaSchema = new Schema ({
    nombre: {
        type: String,
        required: true
    },
    cuit: {
        type: String,
        required: true
    },
    titular: {
        type: String,
        required: true
    },
    rolTitular: {
        type: String,
        required: true
    },
    representanteTecnico: {
        type: String,
        required: true
    }
})

export const empresaModel = model ("empresas",empresaSchema);