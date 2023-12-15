import {escribirIdEnArchivo,leerIdDeArchivo} from "../FileSystem.js"
import {__dirname} from "../Path.js"

const PATH_ARCHIVO_ID_CART = __dirname + "/models/IdCart.json";

//CLASE PRODUCT
export class Cart {
    constructor () {
        this.products = [],
        this.id = Cart.idIncremental();
    }

    //METODOS
    //Se encarga de agregar la key ID si es que no existe y luego suma 1 por cada nuevo producto generado.
    static idIncremental() {
        let lastId = parseInt(leerIdDeArchivo(PATH_ARCHIVO_ID_CART));

        if(!lastId) {
            lastId = 1;
        } else {
            lastId++;
        }
        
        escribirIdEnArchivo(PATH_ARCHIVO_ID_CART,lastId);

        return lastId;
    }  
}