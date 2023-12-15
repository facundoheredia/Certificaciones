export class Product {
    constructor (title, description, price, thumbnail, code, id, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.id = Product.idIncremental();
        this.stock = stock;
    }

    static idIncremental() {
        if(this.idIncrement) {
            this.idIncrement++;
        } else {
            this.idIncrement = 1;
        }

        return this.idIncrement;
    }
}