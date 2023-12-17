import { Schema, model } from "mongoose";

const contratoSchema = new Schema ({
    titulo: {
        type: String,
        require: true
    },
    expediente: {
        type: String,
        require: true
    },
    empresa: {
        type: String,
        require: true
    },
    titularEmpresa: {
        type: String,
        require: true
    },
    rolTitularEmpresa: {
        type: String,
        require: true
    },
    firmaContrato: {
        type: String,
        require: true
    },
    tipoContrato: {
        type: String,
        require: true
    },
    ordenDeCompra: {
        type: String,
        require: true
    },
    institutos: [],
    monto: {
        type: Number,
        require: true
    },
    duracion: {
        type: Number,
        require: true
    },
    fechaRegistro: {
        type: String,
        require: true
    },
    numeroRegistro: {
        type: Number,
        require: true
    }
})

export const contratoModel = model("contratos", contratoSchema);