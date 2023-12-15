import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    const token = jwt.sign({user}, JWT_SECRET, {expiresIn:"12hs"});
    console.log(token);

    return token;
}

export const authToken = (req,res,next) => {
    const authHeader = req.headers.Autorization;

    if(!authHeader) {
        return res.status(401).send({error: "Usuario no autenticado"})
    }

    const token = authHeader.split(" ")[1];

    jwt.sign(token, process.env.JWT_SECRET, (error, credential) => {
        if(error) {
            return res.status(403).send({error: "usuario no autorizado. El Token no es correcto."});
        }
    })

    req.user = credential.user;
    next();
}