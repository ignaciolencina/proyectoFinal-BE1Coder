import express from "express";
import { Carts } from "../../controllers/carts/cartsIndex.js";

export const cartRouter = express.Router();

cartRouter.post("/", Carts.PostController.postCart);

cartRouter.get("/", Carts.GetController.getCarts);
cartRouter.get("/:id", Carts.GetController.getCart);

cartRouter.put("/:id", Carts.PutController.updateCart);
cartRouter.put("/:id/products/:pid", Carts.PutController.updateProductQuantity);

cartRouter.delete("/:id", Carts.DeleteController.deleteCart);
cartRouter.delete('/:id/products/:pid', Carts.DeleteController.deleteProductFromCart);