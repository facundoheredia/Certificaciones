import { ProductManager } from "./ProductManager.js";
import { listaDeProductosBase } from "./ProductsList.js";

//NUEVO PRODUCT MANAGER
const productManager = new ProductManager ();

//VERIFICACION DE LISTA DE PRODUCTOS DE PRUEBA PARA AGREGAR AL PRODUCT MANAGER
console.log("\n[--------------------------------------------------------------------]\n[VERIFICANDO DATOS DE LISTA DE PRODUCTOS A AGREGAR AL PRODUCT MANAGER]\n[--------------------------------------------------------------------]\n");
listaDeProductosBase.forEach(producto => {
    productManager.addProduct(producto);
})

//VERIFICACION CON ID REPETIDA EN LISTA DE PRODUCTOS DE PRUEBA PARA AGREGAR AL PRODUCT MANAGER
const productoIndividual =     
{
    title: "productoPrueba", 
    description: "este es el producto de prueba", 
    price: 99999, 
    thumbnail: "esta es su imagen", 
    code: "AA4542A",
    id: 1, 
    stock: 1,
}
productManager.addProduct(productoIndividual);

//PRODUCTOS AGREGADOS AL PRODUCT MANAGER
console.log("\n[----------------------------------------------]\n[LISTA DE PRODUCTOS AGREGADOS A PRODUCT MANAGER]\n[----------------------------------------------]\n");
productManager.getProducts();

//PRUEBA DE BUSQUEDA DE UN PRODUCTO POR ID
console.log("\n[------------------------------]\n[SE BUSCA EL SIGUIENTE PRODUCTO]\n[------------------------------]\n");
const productoBuscado1 = productManager.getProductById(1);
console.log(`----------\nID: ${productoBuscado1.id}\nNOMBRE: ${productoBuscado1.title}\nDESCRIPCION: ${productoBuscado1.description} \nPRECIO: $ ${productoBuscado1.price} \nIMAGEN: ${productoBuscado1.thumbnail}\nSTOCK: ${productoBuscado1.stock}\n----------\n`);

console.log("\n[------------------------------]\n[SE BUSCA EL SIGUIENTE PRODUCTO]\n[------------------------------]\n");
productManager.getProductById(7);
