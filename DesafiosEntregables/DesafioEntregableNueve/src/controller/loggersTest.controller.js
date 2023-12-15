export const getDebug = async (req,res) => {
    try {
        req.logger.debug("Hola Debug!");
        res.status(200).send({respuesta: "[OK]", mensaje: "Hola Debug!"});
    } catch (error){
        req.logger.error("Error en Debug!");
        res.status(400).send({respuesta: "[ERROR]", mensaje: "No se ha podido cargar Debug"});
    }
}

export const getHttp = async (req,res) => {
    try {
        req.logger.http("Hola Http!");
        res.status(200).send({respuesta: "[OK]", mensaje: "Hola Http!"});
    } catch (error){
        req.logger.error("Error en Http!");
        res.status(400).send({respuesta: "[ERROR]", mensaje: "No se ha podido cargar Http"});
    }
}

export const getInfo = async (req,res) => {
    try {
        req.logger.info("Hola Info!");
        res.status(200).send({respuesta: "[OK]", mensaje: "Hola Info!"});
    } catch (error){
        req.logger.error("Error en Info!");
        res.status(400).send({respuesta: "[ERROR]", mensaje: "No se ha podido cargar Info"});
    }
}

export const getWarning = async (req,res) => {
    try {
        req.logger.warning("Hola Warning!");
        res.status(200).send({respuesta: "[OK]", mensaje: "Hola Warning!"});
    } catch (error){
        req.logger.error("Error en Warning!");
        res.status(400).send({respuesta: "[ERROR]", mensaje: "No se ha podido cargar Warning"});
    }
}

export const getError = async (req,res) => {
    try {
        req.logger.error("Hola Error!");
        res.status(200).send({respuesta: "[OK]", mensaje: "Hola Error!"});
    } catch (error){
        req.logger.error("Error en Error!");
        res.status(400).send({respuesta: "[ERROR]", mensaje: "No se ha podido cargar Error"});
    }
}

export const getFatal = async (req,res) => {
    try {
        req.logger.fatal("Hola Fatal!");
        res.status(200).send({respuesta: "[OK]", mensaje: "Hola Fatal!"});
    } catch (error){
        req.logger.error("Error en Fatal!");
        res.status(400).send({respuesta: "[ERROR]", mensaje: "No se ha podido cargar Fatal"});
    }
}