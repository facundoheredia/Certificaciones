//IMPORTACIONES
import fs from "fs";

export async function escribirEnArchivo (path, products) {
    const data = JSON.stringify(products,null,2)

    await fs.promises.writeFile(path, data);
}

export async function leerDeArchivo (path) {
    const data = await fs.promises.readFile(path,"utf-8");
    const arrayDeElementos = JSON.parse(data);
  
    return arrayDeElementos;
}

export function escribirIdEnArchivo(path, id) {
    const data = JSON.stringify(id);
    fs.writeFileSync(path, data);
}

export function leerIdDeArchivo (path) {
    const data = fs.readFileSync(path,"utf-8");
    const ultimoId = JSON.parse(data);
    return ultimoId;
}