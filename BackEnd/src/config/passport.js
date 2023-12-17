import local from "passport-local";
import jwt from "passport-jwt";
import passport from "passport";
import { crearHash, validarContrasenia } from "../utils/bcrypt.js";
import { usuarioModel } from "../models/usuarios.models.js";
import "dotenv/config";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initPassport = () => {

    const cookieExtractor = req => {
        const token = req.headers.authorization ? req.headers.authorization : {};

        return token;
    }

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) => {
            try {
                return done (null, jwt_payload.user)
            } catch (error) {
                return done(error)
            }
    }))

    passport.use("registro", new LocalStrategy(
        {passReqToCallback: true, usernameField: "legajo", passwordField: "contrasenia"}, async (req, username, contrasenia, done) => {
            const {nombre, apellido, legajo} = req.body;
            
            try {
                 const usuario = await usuarioModel.findOne({legajo: legajo})

                 if(usuario) {
                    return done(null, false);
                 }

                 const contraseniaHash = crearHash(contrasenia);
                 const usuarioCreado = await usuarioModel.create({nombre: nombre,apellido: apellido, legajo: legajo, contrasenia: contraseniaHash});

                 return done(null, usuarioCreado);

            } catch (error){
                return done(error);
            }
        }
    ))

    passport.use("ingreso", new LocalStrategy(
        {usernameField:"legajo", passwordField: "contrasenia"}, async (username, contrasenia, done) => {

            try {
                const usuario = await usuarioModel.findOne({legajo: username});

                if(!usuario) {
                    return done(null, false);
                } 

                if(validarContrasenia(contrasenia, usuario.contrasenia)) {
                    return done(null, usuario);
                }
                return done(null, false);

            } catch(error) {
                return done(error);
            }
        }
    ))

    passport.serializeUser((usuario, done) => {
        done(null, usuario._id);
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const usuario = await usuarioModel.findById(id);
            done(null,usuario);
        } catch (error) {
            console.log("Error deserializando el usuario:" + error)
        }
    })
}

export default initPassport;