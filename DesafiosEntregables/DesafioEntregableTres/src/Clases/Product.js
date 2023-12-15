//CLASE PRODUCT
export class Product {
    constructor (title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.id = Product.idIncremental();
        this.stock = stock;
    }

    //METODOS
    //Se encarga de agregar la key ID si es que no existe y luego suma 1 por cada nuevo producto generado.
    static idIncremental() {
        if(this.idIncrement) {
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }

        return this.idIncrement;
    }
}