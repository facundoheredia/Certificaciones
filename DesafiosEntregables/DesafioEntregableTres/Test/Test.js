//IMPORTACIONES
import { ProductManager } from "../src/Clases/ProductManager.js";
import { listaDeProductosBase } from "./TestProductsList.js";

//CONSTANTES
const PathArchivoTest = "./DesafioEntregableTres/Test/Test.json";

//TESTS
export async function iniciarTesteo () {
    //  [ TEST 1 ]
    const productManager = testIniciarInstaciaProductManager(PathArchivoTest);
    //  [ TEST 2 ]
    await testCargarProductosAlProductManajer(productManager);
    //  [ TEST 3 ]
    await testAgregarProductoConCodeExistente(productManager);
    //  [ TEST 4 ]
    await testVerificarProductosEnArchivoJson(productManager);
    //  [ TEST 5 ]
    await testBuscarProductoPorIdEnArchivoJson (productManager,1);
    //  [ TEST 5 ]
    await testBuscarProductoPorIdEnArchivoJson (productManager,7);
    //  [ TEST 6 ]
    await testModificarProductoEnArchivoJson (productManager,1);
    //  [ TEST 7 ]
    await testBorrarProductoEnArchivoJson (productManager,1);
    //  [ TEST 4 ]
    await testVerificarProductosEnArchivoJson(productManager);
};
//  [ TEST 1 ] -> PRODUCT MANAGER -> Se genera la instancia de un nuevo ProductManager
function testIniciarInstaciaProductManager (path) {
    console.log("\n[TEST 1] => INICIANDO PRODUCT MANAGER\n");
    const productManager = new ProductManager (path);

    if(productManager) {
        console.log("\n[OK] => PRODUCT MANAGER INICIADO\n");
    } else {
        console.log("\n[ERROR] => PRODUCT MANAGER NO INICIO\n");
    }

    return productManager;
}
//  [ TEST 2 ] -> VERIFICACION DE LISTA DE PRODUCTOS DE PRUEBA PARA AGREGAR AL PRODUCT MANAGER
async function testCargarProductosAlProductManajer (productManager) {
    console.log("\n[TEST 2] => AGREGANDO LISTA DE PRODUCTOS A PRODUCT MANAGER\n");

    try {
        listaDeProductosBase.forEach(producto => {
        productManager.addProduct(producto);
        })   
        console.log("\n[OK] => LISTA DE PRODUCTOS CARGADA CON EXITO AL PRODUCT MANAGER\n")
    } catch (error) {
        console.log("\n[ERROR] => LISTA DE PRODUCTOS NO SE PUDO CARGADAR AL PRODUCT MANAGER\n",error)
    }
}
//  [ TEST 3 ] -> PRUEBA DE AGREGAR UN PRODUCTO CON UN CODE EXISTENTE AL PRODUCTMANAGER CON EL METODO "addProduct"
async function testAgregarProductoConCodeExistente (productManager) {
    console.log("\n[TEST 3] => VERIFICANDO CODE DE PRODUCTO IGUAL A EXISTENTE EN PRODUCT MANAGER\n");
    try {
        const productoIndividual =     
        {
            title: "productoPrueba", 
            description: "este es el producto de prueba", 
            price: 99999, 
            thumbnail: "esta es su imagen", 
            code: "rtrsaA",
            stock: 1,
        }
        await productManager.addProduct(productoIndividual);
    } catch (error) {
        console.log("\n[ERROR] => PRODUCTO NO AGREGADO AL PRODUCT MANAGER, SU CODE SE REPITE\n",error)
    }
}
//  [ TEST 4 ] -> PRUEBA PARA MOSTRAR LOS PRODUCTOS EN PRODUCTMANAGER CON EL METODO "getProducts"
async function testVerificarProductosEnArchivoJson (productManager) {
    console.log("\n[TEST 4] => LISTA DE PRODUCTOS EN ARCHIVO TEST.JSON\n");
try {
    const arrayDeProductos = await productManager.getProducts();
    arrayDeProductos.forEach (producto => console.log(`----------\nID: ${producto.id}\nNOMBRE: ${producto.title}\nDESCRIPCION: ${producto.description} \nPRECIO: $ ${producto.price} \nIMAGEN: ${producto.thumbnail}\nSTOCK: ${producto.stock}\n----------\n`))
    console.log("\n[OK] => SE CARGARON TODOS LOS PRODUCTOS DEL ARCHIVO TEST.JSON\n");
} catch (error) {
    console.log("\n[ERROR] => NO SE CARGARON LOS PRODUCTOS DEL ARCHIVO TEST.JSON\n",error)
}
}
//  [ TEST 5 ] ->  PRUEBA PARA BUSCAR PRODUCTOS POR ID CON EL METODO "getProductById"
async function testBuscarProductoPorIdEnArchivoJson (productManager,id) {
    console.log("\n[TEST 5] => BUSQUEDA DE PRODUCTO POR ID\n");
    try {
        const productoBuscado1 = await productManager.getProductById(id);
        console.log(`----------\nID: ${productoBuscado1.id}\nNOMBRE: ${productoBuscado1.title}\nDESCRIPCION: ${productoBuscado1.description} \nPRECIO: $ ${productoBuscado1.price} \nIMAGEN: ${productoBuscado1.thumbnail}\nSTOCK: ${productoBuscado1.stock}\n----------\n`);
        console.log("\n[OK] => LA BUSQUEDA SE REALIZO CON EXITO\n");
    } catch (error) {
        console.log("\n[ERROR] => HUBO UN ERROR EN LA BUSQUEDA\n",error)
    }
}
//  [ TEST 6 ]   ->  PRUEBA MODIFICACION DE DATO DEL PRODUCTO CON EL METODO "updateProduct"
async function testModificarProductoEnArchivoJson (productManager,id) {
    console.log("\n[TEST 6] => MODIFICAR SIGUIENTE PRODUCTO\n");
    try {
        const productoAModificar = await productManager.getProductById(id);
        console.log(`----------\nID: ${productoAModificar.id}\nNOMBRE: ${productoAModificar.title}\nDESCRIPCION: ${productoAModificar.description} \nPRECIO: $ ${productoAModificar.price} \nIMAGEN: ${productoAModificar.thumbnail}\nSTOCK: ${productoAModificar.stock}\n----------\n`);
        await productManager.updateProduct(productoAModificar.id,"title","Este titulo fue modificado");
        const productoModificado = await productManager.getProductById(productoAModificar.id);
        console.log(`----------\nID: ${productoModificado.id}\nNOMBRE: ${productoModificado.title}\nDESCRIPCION: ${productoModificado.description} \nPRECIO: $ ${productoModificado.price} \nIMAGEN: ${productoModificado.thumbnail}\nSTOCK: ${productoModificado.stock}\n----------\n`);    
    } catch (error) {
        console.log(error)
    }
}
//  [ TEST 7 ]   ->  PRUEBA ELIMINAR PRODUCTO DEL ARCHIVO JSON POR ID CON EL METODO "updateProduct"
async function testBorrarProductoEnArchivoJson (productManager,id) {
    console.log("\n[TEST 7] => SE BORRO EL PRODUCTO ID 1 VER ARCHIVO JSON\n");
    try {
        await productManager.deleteProduct(id);
        const productoBuscado2 = await productManager.getProductById(id);
        console.log(`----------\nID: ${productoBuscado2.id}\nNOMBRE: ${productoBuscado2.title}\nDESCRIPCION: ${productoBuscado2.description} \nPRECIO: $ ${productoBuscado2.price} \nIMAGEN: ${productoBuscado2.thumbnail}\nSTOCK: ${productoBuscado2.stock}\n----------\n`);
    } catch (error) {
        console.log(error)
    }
}