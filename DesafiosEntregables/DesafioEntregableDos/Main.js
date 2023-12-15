//IMPORTACIONES
import { ProductManager } from "./ProductManager.js";
import { listaDeProductosBase } from "./ProductsList.js";

//CONSTANTES
const PATHARCHIVO = "./DesafioEntregableDos/Test.json";

//TESTS
//  [ TEST 1 ] -> PRODUCT MANAGER -> Se genera la instancia de un nuevo ProductManager
console.log("\n[TEST 1] => INICIANDO PRODUCT MANAGER\n");
const productManager = new ProductManager (PATHARCHIVO);

//  [ TEST 2 ] -> VERIFICACION DE LISTA DE PRODUCTOS DE PRUEBA PARA AGREGAR AL PRODUCT MANAGER
console.log("\n[TEST 2] => AGREGANDO LISTA DE PRODUCTOS A PRODUCT MANAGER\n");
listaDeProductosBase.forEach(producto => {
    productManager.addProduct(producto);
})

//  [ TEST 3 ] -> PRUEBA DE AGREGAR UN PRODUCTO CON UN CODE EXISTENTE AL PRODUCTMANAGER CON EL METODO "addProduct"
console.log("\n[TEST 3] => VERIFICANDO CODE DE PRODUCTO IGUAL A EXISTENTE EN PRODUCT MANAGER\n");
const productoIndividual =     
{
    title: "productoPrueba", 
    description: "este es el producto de prueba", 
    price: 99999, 
    thumbnail: "esta es su imagen", 
    code: "rtrsaA",
    stock: 1,
}
productManager.addProduct(productoIndividual);

//  [ TEST 4 ] -> PRUEBA PARA MOSTRAR LOS PRODUCTOS EN PRODUCTMANAGER CON EL METODO "getProducts"
console.log("\n[TEST 4] => LISTA DE PRODUCTOS AGREGADOS AL ARCHIVO TEST.JSON\n");
const arrayDeProductos = productManager.getProducts();

arrayDeProductos.forEach (producto => console.log(`----------\nID: ${producto.id}\nNOMBRE: ${producto.title}\nDESCRIPCION: ${producto.description} \nPRECIO: $ ${producto.price} \nIMAGEN: ${producto.thumbnail}\nSTOCK: ${producto.stock}\n----------\n`))


//  [ TEST 5 ] ->  PRUEBA PARA BUSCAR PRODUCTOS POR ID CON EL METODO "getProductById"
console.log("\n[TEST 5] => BUSQUEDA DE PRODUCTOS POR ID\n");
//  [ 5.1 ] ->  Buscar un producto que si exista el id  
console.log("\n[TEST 5.1] => SE BUSCA EL SIGUIENTE PRODUCTO EXISTENTE\n");
const productoBuscado1 = productManager.getProductById(1);
console.log(`----------\nID: ${productoBuscado1.id}\nNOMBRE: ${productoBuscado1.title}\nDESCRIPCION: ${productoBuscado1.description} \nPRECIO: $ ${productoBuscado1.price} \nIMAGEN: ${productoBuscado1.thumbnail}\nSTOCK: ${productoBuscado1.stock}\n----------\n`);
//  [ 5.2 ] ->  Buscar un producto que no exista el id  
console.log("\n[TEST 5.2] => SE BUSCA EL SIGUIENTE PRODUCTO NO EXISTENTE\n");
try {
    const productoBuscado2 = productManager.getProductById(7);
    console.log(`----------\nID: ${productoBuscado2.id}\nNOMBRE: ${productoBuscado2.title}\nDESCRIPCION: ${productoBuscado2.description} \nPRECIO: $ ${productoBuscado2.price} \nIMAGEN: ${productoBuscado2.thumbnail}\nSTOCK: ${productoBuscado2.stock}\n----------\n`);
} catch (error) {
    console.log(error)
}

//  [ TEST 6 ]   ->  PRUEBA MODIFICACION DE DATO DEL PRODUCTO CON EL METODO "updateProduct"
console.log("\n[TEST 6] => MODIFICAR SIGUIENTE PRODUCTO\n");
const productoAModificar = productManager.getProductById(1);
console.log(`----------\nID: ${productoAModificar.id}\nNOMBRE: ${productoAModificar.title}\nDESCRIPCION: ${productoAModificar.description} \nPRECIO: $ ${productoAModificar.price} \nIMAGEN: ${productoAModificar.thumbnail}\nSTOCK: ${productoAModificar.stock}\n----------\n`);
productManager.updateProduct(productoAModificar.id,"title","Este titulo fue modificado");
const productoModificado = productManager.getProductById(productoAModificar.id);
console.log(`----------\nID: ${productoModificado.id}\nNOMBRE: ${productoModificado.title}\nDESCRIPCION: ${productoModificado.description} \nPRECIO: $ ${productoModificado.price} \nIMAGEN: ${productoModificado.thumbnail}\nSTOCK: ${productoModificado.stock}\n----------\n`);

//  [ TEST 7 ]   ->  PRUEBA ELIMINAR PRODUCTO DEL ARCHIVO JSON POR ID CON EL METODO "updateProduct"
console.log("\n[TEST 7] => SE BORRO EL PRODUCTO ID 1 VER ARCHIVO JSON\n");
productManager.deleteProduct(1);