import { usuarioModel } from "../models/usuarios.models.js";

export const obtenerUsuarios = async (req,res) => {
    try {
        const usuarios = await usuarioModel.find();

        if(usuarios) {
            res.status(200).send({respuesta: "[OK] - Usuarios encontrados en la base de datos", mensaje: usuarios});
        } else {
            res.status(404).send({respuesta: "[ERROR] - No hay usuarios", mensaje: "No se han podido encontrar a los usuarios"});
        }
    } catch(error) {
        res.status(400).send({respuesta: "[ERROR] - Error interno del servidor", mensaje: "No se han podido cargar los usuarios"});
    }
}

export const obtenerUsuarioPorLegajo = async (req,res) => {
    const {usuarioLegajo} = req.params;

    try {
        const usuario = await usuarioModel.findOne({legajo: usuarioLegajo});

        if(usuario) {
            res.status(200).send({respuesta: "[OK] - Se encontro este usuario segun su legajo", mensaje: usuario});
        } else {
            res.status(404).send({respuesta: "[ERROR] - No hay usuario", mensaje: "No se ha podido encontrar el usuario"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR] - Error interno del servidor", mensaje: error});
    }
}

export const modificarUsuarioPorLegajo = async (req,res) => {
    const {usuarioLegajo} = req.params;
    const {nombre, apellido, legajo, contrasenia} = req.body;

    try {
        const usuario = await usuarioModel.findByIdAndUpdate(usuarioLegajo,{nombre, apellido, legajo, contrasenia});

        if(usuario) {
            res.status(200).send({respuesta: "[OK]", mensaje: "Usuario actualizado correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido actualizar el usuario"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR] - Error interno del servidor", mensaje: error});
    }
}

export const borrarUsuarioPorLegajo = async (req,res) => {
    const {usuarioLegajo} = req.params;

    try {
        const usuario = await usuarioModel.findByIdAndDelete(usuarioLegajo);

        if(usuario) {
            res.status(200).send({respuesta: "[OK]", mensaje: "Usuario eliminado correctamente"});
        } else {
            res.status(404).send({respuesta: "[ERROR]", mensaje: "No se ha podido eliminar el usuario"});
        }
    } catch (error){
        res.status(400).send({respuesta: "[ERROR]", mensaje: error});
    }
}