//IMPORTACIONES
import { iniciarTesteo } from "../Test/Test.js";
import { ProductManager } from "./Clases/ProductManager.js";
import { APP,PORT,ServidorLecturaJson,servidorMenuPrincipal } from "./ServerConfig.js";

//CONSTANTES
const pathArchivoServidor = "./DesafioEntregableTres/src/ListaDeProductosEnServidor.json";
const productManagerServer = new ProductManager(pathArchivoServidor);

APP.use(ServidorLecturaJson);

APP.get("/static",(req,res) => {
    res.render("home");
});

APP.get("/", (req,res) => {
    res.send(servidorMenuPrincipal());
});

APP.listen(PORT, () => {
    console.log(`[SERVIDOR EN PUERTO ${PORT}]`);
    console.log(`[INGRESE A http://localhost:4000/ PARA CONTINUAR]`);
})

APP.get("/test", (req,res) => {
    let mensajeDeTest = "<h1>[TEST REALIZADO]</h1>";
    mensajeDeTest += "<p>Ya puede volver a la URL principal</p>";
    mensajeDeTest += "<p>Se ha generado un archivo Test.json en la carpeta Test</p>";
    mensajeDeTest += "<p>Y se mostro por consola cada uno de los resultados del test.</p>";
    mensajeDeTest += "<a href=http://localhost:4000/>[PAGINA PRINCIPAL]</a>";
    iniciarTesteo ();
    res.send(mensajeDeTest);
});

APP.get("/products", async (req,res) => {
    let limit = parseInt(req.query.limit);
    const arrayDeProductos = await productManagerServer.getProducts();

    if(!limit) {
        res.send(arrayDeProductos);
    } else {
        res.send(arrayDeProductos.slice(0,limit));
    }
});

APP.get("/products/:pid", async (req,res) => {
    const pid = parseInt(req.params.pid)
    const productoBuscado = await productManagerServer.getProductById(pid);

    if(productoBuscado) {
        res.send(productoBuscado);
    } else {
        res.status(400).send("Producto no encontrado");
    }
});