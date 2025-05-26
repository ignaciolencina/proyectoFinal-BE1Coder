import CartModel from "../../../models/cartSchema.js";

export class PostController {
  static async postCart(req, res) {
    const { body } = req;

    const newCart = new CartModel({
      products: body.products.map((product) => ({
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })),
    });

    try {
      await newCart.save();

      res.status(201).json({
        data: newCart,
        message: "Carrito agregado correctamente",
      });
    } catch (e) {
      console.error("Error al guardar carrito:", e);
      res
        .status(500)
        .json({ error: "Ocurrió un error al intentar guardar el carrito" });
    }
  }
}
