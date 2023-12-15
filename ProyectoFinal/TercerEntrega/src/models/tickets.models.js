import { Schema, model } from "mongoose";

const ticketSchema = new Schema ({
    codigo: {
        type: String,
        unique: true
    },
    fechaDeCompra: {
        type: Date,
        default: Date.now
    },
    monto: {
        type: Number
    },
    comprador: {
        type: String
    }
})

export const ticketModel = model("tickets", ticketSchema);