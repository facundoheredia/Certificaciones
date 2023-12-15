//IMPORTACIONES
import fs from "fs";

export function escribirEnArchivo (path, product) {
    let arrayDeProductos = [];

    if(!fs.existsSync(path)) {
        arrayDeProductos.push(product);
    } else {
        arrayDeProductos = leerDeArchivo (path);
        arrayDeProductos.push(product);
    }

    fs.writeFileSync(path, JSON.stringify(arrayDeProductos,null,2))
}

export function leerDeArchivo (path) {

    const data = fs.readFileSync(path,"utf-8");
    const arrayDeProductos = JSON.parse(data);
    
    return arrayDeProductos;
}