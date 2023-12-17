import { empresaModel } from "../models/empresas.models.js";

export const obtenerEmpresas = async (req,res) => {
    try {
        const empresas = await empresaModel.find();

        if(empresas) {
            res.status(200).send({respuesta: "[OK] - Empresas encontradas en la base de datos", mensaje: empresas});
        } else {
            res.status(404).send({respuesta: "[ERROR] - No hay Empresas", mensaje: "No se han podido encontrar a las empresas"});
        }
    } catch (error) {
        res.status(400).send({respuesta: "[ERROR] - Error interno del servidor", mensaje: "No se han podido cargar las empresas"});
    }
}

export const obtenerEmpresaPorCuit = async (req,res) => {
    const {cuit} = req.params;

    try {
        const empresa = await empresaModel.findOne({cuit:cuit});

        if(empresa) {
            res.status(200).send({respuesta: "[OK] - Empresa encontrada en la base de datos", mensaje: empresa});
        } else {
            res.status(404).send({respuesta: "[ERROR] - No hay Empresa", mensaje: "No se ha podido encontrar a la empresa"});
        }
    } catch (error) {
        res.status(400).send({respuesta: "[ERROR] - Error interno del servidor", mensaje: "No se ha podido cargar la empresa"});
    }
}

export const modificarEmpresaPorCuit = async (req,res) => {
    const {cuit} = req.params;
    const {nombre,titular,rolTitular,representanteTecnico} = req.body;

    try {
        const empresa = await empresaModel.findOneAndUpdate({cuit:cuit},{nombre,titular,rolTitular,representanteTecnico});

        if(empresa) {
            res.status(200).send({respuesta: "[OK]", mensaje: "Empresa actualizada correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido actualizar la empresa"});
        }
    } catch (error) {
        res.status(400).send({respuesta: "[ERROR] - Error interno del servidor", mensaje: "No se ha podido cargar la empresa"});
    }
}

export const borrarEmpresaPorCuit = async (req,res) => {
    const {cuit} = req.params;

    try {
        const empresa = await empresaModel.findOne({cuit:cuit});

        if(empresa) {
            res.status(200).send({respuesta: "[OK]", mensaje: "Empresa eliminada correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido eliminar la empresa"});
        }
    } catch (error) {
        res.status(400).send({respuesta: "[ERROR] - Error interno del servidor", mensaje: error});
    }
}

export const crearEmpresa = async (req,res) => {
    const {nombre, cuit, titular, rolTitular, representanteTecnico} = req.body;

    try {
        const empresa = empresaModel.create({nombre, cuit, titular, rolTitular, representanteTecnico});

        if(empresa) {
            res.status(200).send({respuesta: "[OK]", mensaje: "Empresa creada correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido crear la empresa"});
        }
    } catch (error) {
        res.status(400).send({respuesta: "[ERROR] - Error interno del servidor", mensaje: error});
    }
}