import { Schema, model } from "mongoose";

const obraSchema = new Schema ({
    fechaDeInicio: {
        type: Date
    },
    neutralizaciones: [],
    desneutralizaciones: [],
    ampliacionesDePlazo: [],
    fechaDeFinalizacion: {
        type: Date
    },
    certificados: [],
    ordenesDeServicio: [],
    notasDePedido: [],
    fechaRecepcionProvisoria: {
        type: Date
    },
    fechaRecepcionDefinitiva: {
        type: Date
    }
})

export const obraModel = model("obras", obraSchema);