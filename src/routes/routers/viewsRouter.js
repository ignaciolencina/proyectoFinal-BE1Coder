import express from 'express';
import { Views } from '../../controllers/views/viewsIndex.js';

export const viewsRouter = express.Router();

viewsRouter.get("/products", Views.GetController.getProducts);
viewsRouter.get("/carts", Views.GetController.getCarts);
viewsRouter.get("/carts/:id", Views.GetController.getCart);