import { Schema, model } from "mongoose";
import {usuarioModel} from "./users.models.js";
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
        type: Number
    },
    comprador: {
            type: String,
            required: true
    }
})

ticketSchema.pre("save", async function (next) {
    if(!this.code) {
        this.code = uuidv4();
    }
    next();
})

export const ticketModel = model("tickets", ticketSchema);