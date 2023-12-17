import {contratoModel} from "../models/contratos.models.js";

export const obtenerContratos = async (req,res) => {
    try {
        const contratos = await contratoModel.find();

        if(contratos) {
            res.status(200).send({respuesta: "[OK] - Contratos encontrados en la base de datos", mensaje: contratos});
        } else {
            res.status(404).send({respuesta: "[ERROR] - No hay contratos", mensaje: "No se han podido encontrar a los contratos"});
        }
    } catch (error) {
        res.status(400).send({respuesta: "[ERROR] - Error interno del servidor", mensaje: "No se han podido cargar los contratos"});
    }
}

export const obtenerContratoPorExpediente = async (req,res) => {
    const {expendiente} = req.params;

    try {
        const contrato = await contratoModel.findOne({expendiente: expendiente});

        if(contrato) {
            res.status(200).send({respuesta: "[OK] - Contrato encontrado en la base de datos segun expendiente", mensaje: contrato});
        } else {
            res.status(404).send({respuesta: "[ERROR] - No hay contrato", mensaje: "No se han podido encontrar al contrato expecificado"});
        }
    } catch (error) {
        res.status(400).send({respuesta: "[ERROR] - Error interno del servidor", mensaje: "No se ha podido cargar el contrato"});
    }
}

export const modificarContratoPorExpediente = async (req,res) => {
    const {expediente} = req.params;
    const {titulo,empresa,titularEmpresa,rolTitularEmpresa,firmaContrato,tipoContrato,ordenDeCompra,institutos,monto,duracion,fechaRegistro,numeroRegistro} = req.body;

    console.log(expediente);
    console.log(req.body)
    try {
        const contrato = await contratoModel.findOneAndUpdate({expediente:expediente},{titulo,empresa,titularEmpresa,rolTitularEmpresa,firmaContrato,tipoContrato,ordenDeCompra,institutos,monto,duracion,fechaRegistro,numeroRegistro});

        if(contrato) {
            res.status(200).send({respuesta: "[OK]", mensaje: "Contrato actualizado correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido actualizar el contrato"});
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({respuesta: "[ERROR] - Error interno del servidor", mensaje: error});
    }
}

export const crearContrato = async (req,res) => {
    const {titulo,expediente,empresa,titularEmpresa,rolTitularEmpresa,firmaContrato,tipoContrato,ordenDeCompra,institutos,monto,duracion,fechaRegistro,numeroRegistro} = req.body;

    try {
        const contrato = await contratoModel.create({titulo,expediente,empresa,titularEmpresa,rolTitularEmpresa,firmaContrato,tipoContrato,ordenDeCompra,institutos,monto,duracion,fechaRegistro,numeroRegistro})
        
        if(contrato) {
            res.status(201).send({respuesta: "[OK]", mensaje: "Contrato creado correctamente"});
        } else {
            res.status(400).send({error:"Error en crear contrato"});
        }
    } catch (error) {
        res.status(400).send({respuesta: "[ERROR] - Error interno del servidor", mensaje: error});
    }
}