import { Product } from "./Product.js";

//GENERACION DE CLASE PRODUCT MANAGER
export class ProductManager {
    //CONSTRUCTOR
    constructor() {
        this.products = [];
        this.idAutoIncremental = 0;
    }

    //METODOS
    //Agrega productos al array products de la clase ProductManager
    addProduct (product) {
        let {title, description, price, thumbnail, code, id, stock} = product;
        
        //verificacion de datos del producto
       if(title && description && price && thumbnail && code && stock) {
                const productExistente = this.getProductById (id);
                //Si no se encontro una id igual se lo agrega y se genera un id nuevo
                if(!productExistente) {
                    id = this.getLastIdAutoIncremental();
                    const nuevoProducto = new Product (title, description, price, thumbnail, code, id, stock)
                    this.products.push(nuevoProducto);
                    this.setLastIdAutoIncremental (id);
                    console.log(`[OK] -> El producto [${title}] agregado correctamente con su id [${id}]`)
                } else {
                    console.log(`[ERROR] -> El Producto [${title}] no se pudo agregar su id [${id}] ya existe`)
                }
       } else {
           console.log(`[ERROR] -> El producto [${title}] no posee todos los campos llenos. No se pudo agregar a la lista`)
       }
    }

    //Muestra los productos guardados en el array de ProductManager
    getProducts () {
        for (const product of this.products) {
            console.log(`----------\nID: ${product.id}\nNOMBRE: ${product.title}\nDESCRIPCION: ${product.description} \nPRECIO: $ ${product.price} \nIMAGEN: ${product.thumbnail}\nSTOCK: ${product.stock}\n----------\n`);
        }
    }

    //Busca y obtiene el producto dentro del array products de ProductManager segun el id ingresado por parametro 
    getProductById (id) {
        const productEncontrado = this.products.find(product => product.id === id);
        
       if(!productEncontrado) {
            console.log("Not found");
        }

        return productEncontrado;
    }

    setLastIdAutoIncremental (id) {
        if (id >= this.idAutoIncremental) {
            this.idAutoIncremental = id;
        }
    }

    getLastIdAutoIncremental () {
        return this.idAutoIncremental + 1;
    }
}


/*
class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(product) {
        const prod = this.products.find(prod => prod.code === product.code)

        if (prod) {
            console.log("Producto ya encontrado")
        } else {
            this.products.push(product)
        }
    }

    getProducts() {
        console.log(this.products)
    }

    getProductById(id) {
        const prod = this.products.find(prod => prod.id === id)

        if (prod) {
            console.log(prod)
        } else {
            console.log("Producto no encontrado")
        }
    }
}
*/