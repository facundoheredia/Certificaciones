import { faker } from "@faker-js/faker";
import { productoModel } from "../models/products.models.js";

const productoFaker = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        titulo: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        precio: faker.commerce.price({min: 1, max:100000}),
        codigo: faker.airline.flightNumber(),
        stock: faker.number.int({min: 1, max: 100}),
        categoria: faker.word.adjective(),
        estado: faker.datatype.boolean()
    }
}

export const crearListaDeProductosFaker = async (req,res) => {
        try {
            const producto = await productoModel.create({...productoFaker()});
   
            if(producto) {
                res.status(201).send({respuesta: "[OK]", mensaje: "Producto faker creado correctamente"});
            } else {
                res.status(400).send({error:"Error en crear producto faker"});
            }
        } catch (error){
            if(error.code == 11000) {
                res.status(400).send({respuesta: "[ERROR]", mensaje: "Producto faker ya creado dato duplicado"});
            } else {
                res.status(400).send({respuesta: "[ERROR]", mensaje: error});
            }
        }
}