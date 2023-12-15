//IMPORTACIONES
import { escribirEnArchivo,leerDeArchivo } from "./FileSystem.js";
import { Product } from "./Product.js";
import fs from "fs";

//CLASE PRODUCT MANAGER
export class ProductManager {
    //CONSTRUCTOR
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    //METODOS
    //Se encarga de agregar un producto si no hay otro producto en el array products con el mismo code.
    addProduct(product) {
        const {title,description,price,thumbnail,code,stock} = product;
        const codigoDeProductoExistente = this.products.find(producto => producto.code === code)

        if (codigoDeProductoExistente) {
            console.log(`[ERROR] -> El code del producto [${title}] ya existe`)
        } else {
            if(title && description && price && thumbnail && code && stock) {
                const nuevoProduct = new Product (title, description, price, thumbnail, code, stock);
                this.products.push(nuevoProduct);
                escribirEnArchivo(this.path,nuevoProduct);
                console.log(`[OK] -> El producto [${title}] agregado correctamente al ProductManager y al Archivo de Texto`)
            } else {
                console.log(`[ERROR] -> El producto [${title}] no posee todos los campos llenos. No se pudo agregar a la lista`)
            }
        }
    }

    //Se encarga de retornar todos los productos en el archivo JSON
    getProducts() {
        const arrayDeProductos = leerDeArchivo(this.path);

        return arrayDeProductos;
    }

    //Se encarga de buscar y retornar un producto con el ID buscado.
    getProductById(id) {
        const arrayDeProductos = this.getProducts();
        const productoEncontrado = arrayDeProductos.find(prod => prod.id === id);

        if (!productoEncontrado) {
            throw new Error ("Producto no encontrado");
        }

        return productoEncontrado;
    }

    //Se encarga de modificar un producto con el ID buscado, la key indicada y el valor de la misma.
    updateProduct(id,key,value) {
        const productoBuscado = this.getProductById(id);
        
        if(productoBuscado.hasOwnProperty(key)) {
            const arrayDeProductos = this.getProducts();
            const indiceDelProductoBuscado = arrayDeProductos.findIndex((elemento) => elemento.id === productoBuscado.id);
            productoBuscado[key] = value;
            arrayDeProductos.splice(indiceDelProductoBuscado,1,productoBuscado);

            fs.writeFileSync(this.path,JSON.stringify(arrayDeProductos,null,2));
        } else {
            console.log(`La key [${key}] no existe`)
        }
    }

    //Se encarga de norrar un producto con el ID buscado.
    deleteProduct(id) {
        const arrayDeProductos = this.getProducts();
        const productoABorrar = arrayDeProductos.find(prod => prod.id === id);

        if (!productoABorrar) {
            throw new Error ("Producto no encontrado");
        } else {
            const NuevoarrayDeProductos = arrayDeProductos.filter(prod => prod.id !== id)
            fs.writeFileSync(this.path,JSON.stringify(NuevoarrayDeProductos,null,2));
        }
    }
}