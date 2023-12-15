import { Schema, model } from "mongoose";

const carritoSchema = new Schema ({
    productos: {
        type: [
            {
                idProducto: {
                    type: Schema.Types.ObjectId,
                    ref: "productos",
                    require: true
                },
                cantidad: {
                    type: Number,
                    require: true
                }
            }
        ],
        default: function () {
            []
        }
    }
});


carritoSchema.pre("findOne", function () {
    this.populate("productos.idProducto")
})

export const carritoModel = model("carritos", carritoSchema);