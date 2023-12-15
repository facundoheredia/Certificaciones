import { Router } from "express";
import { passportError,authorization } from "../utils/messagesError.js";
import { getProductos,getProducto,postProducto,putProducto,deleteProducto } from "../controller/products.controller.js";

const productRouter = Router ();

productRouter.get ("/", getProductos);
productRouter.get ("/:pid", getProducto);
productRouter.post ("/", passportError("jwt"), authorization("admin"), postProducto);
productRouter.put ("/:pid", passportError("jwt"), authorization("admin"), putProducto);
productRouter.delete ("/:pid", passportError("jwt"), authorization("admin"), deleteProducto);

export default productRouter;