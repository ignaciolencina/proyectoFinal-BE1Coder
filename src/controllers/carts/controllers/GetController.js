import CartModel from "../../../models/cartSchema.js";

export class GetController {
  // GET /carts/ - Traer todos los carritos
  static async getCarts(_, res) {
    try {
      const data = await CartModel.find().populate("products.productId");

      const filteredData = data.map((cart) => {
        return {
          id: cart._doc._id,
          products: cart._doc.products.map((product) => ({
            productId: product.productId._id,
            name: product.productId.name,
            price: product.productId.price,
            quantity: product.quantity,
          })),
        };
      });

      res.status(200).json({
        data: filteredData,
        message: "Lista de carritos encontrada correctamente",
      });
    } catch (e) {
      console.error("Error al traer los carritos:", e);
      res
        .status(500)
        .json({ error: "Ocurrió un error al encontrar los carritos" });
    }
  }

  // GET /carts/:cid - Traer solo un carrito especifico
  static async getCart(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const data = await CartModel.findById(id).populate("products.productId");

      if (!data) {
        return res.status(404).json({
          data: null,
          message: "Carrito no encontrado",
        });
      }

      const filteredData = {
        id: data._id,
        products: data.products.map((product) => ({
          productId: product.productId._id,
          name: product.productId.name,
          price: product.productId.price,
          quantity: product.quantity,
        })),
      };

      res.status(200).json({
        data: filteredData,
        message: "Carrito encontrado correctamente",
      });
    } catch (e) {
      console.error("Error al traer el carrito:", e);
      res
        .status(500)
        .json({ error: "Ocurrió un error al encontrar el carrito" });
    }
  }
}
