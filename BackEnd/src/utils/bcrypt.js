import "dotenv/config";
import bcrypt from "bcrypt";

export const crearHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)));

export const validarContrasenia = (password, passwordBDD) => bcrypt.compareSync(password, passwordBDD);