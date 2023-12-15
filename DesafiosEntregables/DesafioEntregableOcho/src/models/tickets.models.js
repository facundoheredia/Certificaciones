import { Schema, model } from "mongoose";
import {v4 as uuidv4} from "uuid";

const ticketSchema = new Schema ({
    codigoCompra: {
        type: String,
        reqired: true,
        unique: true
    },
    fechaDeCompra: {
        type: Date,
        default: Date.now
    },
    montoCompra: {
        type: Number,
        reqired: true
    },
    comprador: {
            type: String,
            required: true
    },
    productos: []
})

ticketSchema.pre("save", async function (next) {
    if(!this.codigoCompra) {
        this.codigoCompra = uuidv4();
    }
    next();
})

export const ticketModel = model("tickets", ticketSchema);