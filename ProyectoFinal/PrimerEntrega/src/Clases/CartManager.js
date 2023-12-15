import { leerDeArchivo,escribirEnArchivo } from "../FileSystem.js";
import { Cart } from "./Cart.js";
import { productManagerServer } from "../routes/products.routes.js";

export class CartManager {
    constructor (path) {
        this.carts = [];
        this.path = path;
    }

    async addCart() {
        let resultadoOperacion = 0;
        const nuevoCarrito = new Cart ();
        
        this.carts = await this.getCarts();
        this.carts.push(nuevoCarrito);
        
        escribirEnArchivo(this.path,this.carts);

        return resultadoOperacion;
    }

    async getCarts() {
        const arrayDeCarts = await leerDeArchivo(this.path);

        return arrayDeCarts;
    }

    async getCartById(cid) {
        const arrayDeCarts = await this.getCarts();
        const cartBuscado = arrayDeCarts.find(cart => cart.id === cid);

        return cartBuscado;
    }

    async addProductToCart (cid,pid) {
        const cartEncontrado = await this.getCartById(cid);
        const productoEncontrado = await productManagerServer.getProductById(pid);
        let resultadoOperacion;

        if(cartEncontrado) {
            if(productoEncontrado) {
                const productosEnCarrito = await this.getProductsFromCart(cid);

                if(productosEnCarrito.length !== 0) {
                    const producto = productosEnCarrito.find(producto => producto.id === pid);
                    const indiceDelProductoBuscado = productosEnCarrito.findIndex(producto => producto.id === pid);
                    if(producto) {
                        producto.quantity ++;
                        productosEnCarrito.splice(indiceDelProductoBuscado,1,producto);
                    } else {
                        productosEnCarrito.push({id:productoEncontrado.id,quantity: 1});
                    }
                    resultadoOperacion = 1;
                } else {
                    productosEnCarrito.push({id:productoEncontrado.id,quantity: 1});
                    resultadoOperacion = 0;
                }
                const arrayDeCarritos = await this.getCarts();
                const indiceDelCarritoBuscado = arrayDeCarritos.findIndex(cart => cart.id === cid);

                cartEncontrado.products = productosEnCarrito;
                arrayDeCarritos.splice(indiceDelCarritoBuscado,1,cartEncontrado);

                this.carts = arrayDeCarritos;

                await escribirEnArchivo(this.path,this.carts);
            } else {
                resultadoOperacion -2;
            }
        } else {
            resultadoOperacion -1;
        }

        return resultadoOperacion;
    }

    async getProductsFromCart (cid) {
        const carritoEncontrado = await this.getCartById(cid);

        return carritoEncontrado.products;
    }
}