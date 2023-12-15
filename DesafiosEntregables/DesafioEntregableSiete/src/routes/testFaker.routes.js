import { Router } from "express";
import {crearListaDeProductosFaker} from "../test/fakerProductos.js"

const testProductsFakerRouter = Router ();

testProductsFakerRouter.post("/",crearListaDeProductosFaker(1));

export default testProductsFakerRouter;