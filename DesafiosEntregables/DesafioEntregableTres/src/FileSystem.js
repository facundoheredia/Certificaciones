//IMPORTACIONES
import fs from "fs";

export async function escribirEnArchivo (path, products) {
    const data = JSON.stringify(products,null,2)

    await fs.promises.writeFile(path, data);
}

export async function leerDeArchivo (path) {

    const data = await fs.promises.readFile(path,"utf-8");
    const arrayDeProductos = JSON.parse(data);
    
    return arrayDeProductos;
}