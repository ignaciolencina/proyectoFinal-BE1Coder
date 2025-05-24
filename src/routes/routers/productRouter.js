import express from 'express';
import { Products } from '../../controllers/products/productsIndex.js';

export const productRouter = express.Router();

productRouter.post("/", Products.PostController.postProduct);