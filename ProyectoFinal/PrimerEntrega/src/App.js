//IMPORTACIONES
import {APP,PORT} from "./Server/ServerConfig.js";
import { servidorMenuPrincipal } from "./Server/ServerConfig.js";

APP.listen(PORT, () => {
    console.log(`[SERVIDOR EN PUERTO ${PORT}]`);
    console.log(`[INGRESE A http://localhost:4000/api/ PARA CONTINUAR]`);
})

APP.get("/api", (req,res) => {
    res.send(servidorMenuPrincipal())
});