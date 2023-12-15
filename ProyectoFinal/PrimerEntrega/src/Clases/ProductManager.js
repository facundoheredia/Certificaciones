//IMPORTACIONES
import { escribirEnArchivo,leerDeArchivo } from "../FileSystem.js";
import { Product } from "./Product.js";

//CLASE PRODUCT MANAGER
export class ProductManager {
    //CONSTRUCTOR
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    //METODOS
    //Se encarga de agregar un producto si no hay otro producto en el array products con el mismo code.
    async addProduct(product) {
        const {title,description,price,thumbnail,code,stock,category,status} = product;
        const productoExistente = await this.getProductByCode(code);
        let resultadoOperacion;

        if (productoExistente) {
            resultadoOperacion = -1;
        } else {
            if(title && description && price && thumbnail && code && stock && category) {
                const nuevoProduct = new Product (title, description, price, thumbnail, code, stock, category, status);
                this.products = await this.getProducts();
                this.products.push(nuevoProduct);
                escribirEnArchivo(this.path,this.products);
                resultadoOperacion = 0;
            } else {
                resultadoOperacion = -2;
            }
        }

        return resultadoOperacion;
    }

    //Se encarga de retornar todos los productos en el archivo JSON
    async getProducts() {
        const arrayDeProductos = await leerDeArchivo(this.path);

        return arrayDeProductos;
    }

    //Se encarga de buscar y retornar un producto con el ID buscado.
    async getProductById(id) {
        const arrayDeProductos = await this.getProducts();
        const productoEncontrado = arrayDeProductos.find(prod => prod.id === id);
        
        return productoEncontrado;
    }

    //Se encarga de buscar y retornar un producto con el ID buscado.
    async getProductByCode(code) {
        const arrayDeProductos = await this.getProducts();
        const productoEncontrado = arrayDeProductos.find(prod => prod.code === code);
    
        return productoEncontrado;
    }

    //Se encarga de modificar un producto con el ID buscado, la key indicada y el valor de la misma.
    async updateProduct(id,product) {
        const productoBuscado = await this.getProductById(id);
        let resultadoOperacion;

        if (productoBuscado) {
            const arrayDeProductos = await this.getProducts();
            const indiceDelProductoBuscado = arrayDeProductos.findIndex((elemento) => elemento.id === productoBuscado.id);
            product.id = productoBuscado.id;
            arrayDeProductos.splice(indiceDelProductoBuscado,1,product);
            await escribirEnArchivo(this.path,arrayDeProductos);
            resultadoOperacion = 0;
        } else {
            resultadoOperacion = -1;
        }

        return resultadoOperacion;
    }

    //Se encarga de norrar un producto con el ID buscado.
    async deleteProduct(id) {
        const arrayDeProductos = await this.getProducts();
        const productoEncontrado = arrayDeProductos.find(prod => prod.id === id);
        let resultadoOperacion;

        if (!productoEncontrado) {
            resultadoOperacion = -1;
        } else {
            const nuevoArrayDeProductos = arrayDeProductos.filter(prod => prod.id !== id)
            await escribirEnArchivo(this.path,nuevoArrayDeProductos);
            resultadoOperacion = 0;
        }

        return resultadoOperacion;
    }
}