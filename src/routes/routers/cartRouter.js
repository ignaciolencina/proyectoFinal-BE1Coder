import express from "express";
import { Carts } from "../../controllers/carts/cartsIndex.js";

export const cartRouter = express.Router();

cartRouter.get("/", Carts.GetController.getCarts);
cartRouter.get("/:id", Carts.GetController.getCart);

cartRouter.post("/", Carts.PostController.postCart);

cartRouter.delete("/:id", Carts.DeleteController.deleteCart);
