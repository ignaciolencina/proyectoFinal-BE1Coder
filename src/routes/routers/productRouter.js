import express from 'express';
import { Products } from '../../controllers/products/productsIndex.js';

export const productRouter = express.Router();

productRouter.get("/", Products.GetController.getProducts);

productRouter.post("/", Products.PostController.postProduct);

productRouter.put("/:id", Products.PutController.putProduct);

productRouter.delete("/:id", Products.DeleteController.deleteProduct);