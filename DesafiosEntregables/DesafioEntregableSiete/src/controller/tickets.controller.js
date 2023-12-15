import { carritoModel } from "../models/carts.models.js";
import { productoModel } from "../models/products.models.js";
import { ticketModel } from "../models/tickets.models.js";

export const getTicket = async (req,res) => {
    const {tid} = req.params;

    try {
        const ticketEncontrado = await ticketModel.findById(tid);

        if(ticketEncontrado) {
            res.status(200).send(ticketEncontrado);
        } else {
            res.status(404).send({error: `Error no se encontro el ticket ${error}`});
        }
    } catch(error) {
        res.status(500).send({error: `Error al consultar ticket ${error}`});
    }
}

export const postTicket = async (req,res) => {

}