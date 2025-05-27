import CartModel from "../../../models/cartSchema.js";

export class PostController {
  // POST /carts/ - Creacion de carrito
  static async postCart(req, res) {
    const { body } = req;

    const newCart = new CartModel({
      products: body.products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
    });

    try {
      const savedCart = await newCart.save();

      await savedCart.populate("products.productId");

      const filteredData = {
        id: savedCart._id,
        products: savedCart.products.map((product) => ({
          productId: product.productId._id,
          name: product.productId.name,
          price: product.productId.price,
          quantity: product.quantity,
        })),
      };

      res.status(201).json({
        data: filteredData,
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
