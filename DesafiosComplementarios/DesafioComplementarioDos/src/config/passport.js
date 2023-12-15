import local from "passport-local";
import passport from "passport";
import jwt from "passport-jwt";
import GithubStrategy from 'passport-github2';
import { crearHash, validarContrasenia } from "../utils/bcrypt.js";
import {usuarioModel} from "../models/users.models.js"

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initPassport = () => {

    const cookieExtractor = req => {
        console.log(req.cookies);

        const token = req.cookies.jwtCookie ? req.cookies.jwtCookie : {};

        console.log(token);

        return token;
    }

    passport.use("jwt", new JWTStrategy ({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
    }, async(jwt_payload, done) => {
        try {
            console.log(jwt_payload);
            return done(null, payload);
        } catch (error) {
            return done(error);
        }
    }))

    passport.use("signUp", new LocalStrategy(
        {passReqToCallback: true, usernameField: "email", passwordField: "contrasenia"}, async (req, username, contrasenia, done) => {
            const {nombre, apellido, edad, email} = req.body;
            
            try {
                 const usuario = await usuarioModel.findOne({email: email})

                 if(usuario) {
                    console.log("El usuario ya existe");
                    return done(null, false);
                 }

                 const contraseniaHash = crearHash(contrasenia);
                 const usuarioCreado = await usuarioModel.create({nombre: nombre,apellido: apellido,edad: edad, email: email, contrasenia: contraseniaHash});

                 return done(null, usuarioCreado);

            } catch (error){
                return done(error);
            }
        }
    ))

    passport.use("login", new LocalStrategy(
        {usernameField:"email", passwordField: "contrasenia"}, async (username, contrasenia, done) => {
            try {
                const usuario = await usuarioModel.findOne({email: username});

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

    passport.use("github", new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET_CLIENT,
        callbackURL: process.env.CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const usuario = await usuarioModel.findOne({email: profile._json.email});

            if(usuario) {
                done(null, usuario);
            } else {
                const usuarioCreado = await usuarioModel.create({nombre: profile._json.name, apellido: " ", email: profile._json.email, edad: 18, password: crearHash(profile._json.email + profile._json.name)});

                done(null, usuarioCreado);
            }
        } catch (error) {
            done(error);
        }
    }))

    passport.use("githubViews", new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET_CLIENT,
        callbackURL: process.env.CALLBACK_URL_VIEWS
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const usuario = await usuarioModel.findOne({email: profile._json.email});

            if(usuario) {
                done(null, usuario);
            } else {
                const usuarioCreado = await usuarioModel.create({nombre: profile._json.name, apellido: " ", email: profile._json.email, edad: 18, password: crearHash(profile._json.email + profile._json.name)});

                done(null, usuarioCreado);
            }
        } catch (error) {
            done(error);
        }
    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario._id);
    })

    passport.deserializeUser(async (id, done) => {
        const usuario = await usuarioModel.findById(id);

        done(null,usuario);
    })
}

export default initPassport;