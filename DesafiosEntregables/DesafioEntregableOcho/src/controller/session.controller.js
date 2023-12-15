import {generateToken} from "../utils/jwt.js";

export const login = async (req,res) => {
    try {
        if(!req.user) {
            res.status(401).send({mensaje: "usuario invalido"});
        } else {
            const token = generateToken(req.user);
            res.status(200).send({token});
        }
    } catch (error) {
        res.status(500).send({mensaje: `[ERROR] - error al iniciar sesion ${error}`});
    }
}

export const signUp = async (req,res) => {
    try {
        if(!req.user) {
            res.status(400).send({mensaje: "usuario ya existente"});
        } 
       
        res.status(200).send({mensaje: "usuario registrado"});
    } catch (error) {
        res.status(500).send({mensaje: `[ERROR] - error al registrar usuario ${error}`});
    }
}

export const logOut = async (req,res) => {
    res.clearCookie("jwtCookie");
    res.status(200).send({resultado: "Usuario deslogueado"})
}