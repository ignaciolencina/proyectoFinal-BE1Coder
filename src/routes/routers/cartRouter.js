import express from 'express';
import { Carts } from '../../controllers/carts/cartsIndex.js';

export const cartRouter = express.Router();

cartRouter.post("/", Carts.PostController.postCart);