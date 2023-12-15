import {escribirIdEnArchivo,leerIdDeArchivo} from "../FileSystem.js"
import {__dirname} from "../Path.js"

const PATH_ARCHIVO_ID_PRODUCT = __dirname + "/models/IdProduct.json";

//CLASE PRODUCT
export class Product {
    constructor (title, description, price, thumbnail, code, stock, category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status = true;
        this.category = category;
        this.id = Product.idIncremental();
    }

    //METODOS
    //Se encarga de agregar la key ID si es que no existe y luego suma 1 por cada nuevo producto generado.
    static idIncremental() {
        let lastId = parseInt(leerIdDeArchivo(PATH_ARCHIVO_ID_PRODUCT));

        if(!lastId) {
            lastId = 1;
        } else {
            lastId++;
        }
        
        escribirIdEnArchivo(PATH_ARCHIVO_ID_PRODUCT,lastId);

        return lastId;
    }    
}