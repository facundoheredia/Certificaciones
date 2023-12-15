import { productoModel } from "../models/products.models.js";

export const getProductos = async (req,res) => {
    const {limit,page,filter,sort} = req.query;
    const pag = page ? page : 1;
    const lim = limit ? limit : 10;
    const ord = sort == "asc" ? 1 : -1;

    try {
        const prods = await productoModel.paginate({filter: filter},{limit: lim, page: pag, sort:{price:ord}});

        if(prods) {
            res.status(200).send(prods)
        } else {
            res.status(404).send({error: "Productos no encontrados"})
        }
    } catch (error) {
        res.status(500).send({error: `Error en consultar productos ${error}`});
    }
}

export const getProducto = async (req,res) => {
    const {pid} = req.params;

    try {
        const prod = await productoModel.findById(pid);

        if(prod) {
            res.status(200).send(prod)
        } else {
            res.status(404).send({error: "Producto no encontrado"})
        }
    } catch (error) {
        res.status(500).send({error: `Error en consultar producto ${error}`});
    }
}

export const postProducto = async (req,res) => {
    const {titulo, descripcion, precio, codigo, stock, categoria} = req.body;

    try {
        const producto = await productoModel.create({titulo, descripcion, precio, codigo, stock, categoria});

        if(producto) {
            res.status(201).send({respuesta: "[OK]", mensaje: "Producto creado correctamente"});
        } else {
            res.status(400).send({error:"Error en crear producto"});
        }
    } catch (error){
        if(error.code == 11000) {
            res.status(400).send({respuesta: "[ERROR]", mensaje: "Producto ya creado dato duplicado"});
        } else {
            res.status(400).send({respuesta: "[ERROR]", mensaje: error});
        }
    }
}

export const putProducto = async (req,res) => {
    const {pid} = req.params;
    const {titulo, descripcion, precio, codigo, stock, categoria, estado} = req.body;

    try {
        const producto = await productoModel.findByIdAndUpdate(pid,{titulo, descripcion, precio, codigo, stock, categoria, estado});

        if(producto) {
            res.status(200).send(producto);
        } else {
            res.status(404).send({error: "Producto no encontrado"});
        }
    } catch (error) {
        res.status(500).send({error: `Error en actualizar producto ${error}`});
    }
}

export const deleteProducto = async (req,res) => {
    const {pid} = req.params;

    try {
        const prod = await productoModel.findByIdAndDelete(pid);

        if(prod) {
            res.status(200).send(prod)
        } else {
            res.status(404).send({error: "Producto no encontrado"})
        }
    } catch (error) {
        res.status(500).send({error: `Error en eliminar producto ${error}`});
    }
}