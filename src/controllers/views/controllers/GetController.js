import ProductModel from "../../../models/productSchema.js";
import CartModel from "../../../models/cartSchema.js";

export class GetController {
  static async getProducts(_, res) {
    try {
      const data = await ProductModel.find({
        isActive: true,
      });

      const products = data.map((product) => {
        return {
          id: product._doc._id,
          name: product._doc.name,
          code: product._doc.code,
          price: product._doc.price,
          stock: product._doc.stock,
          category: product._doc.category,
        };
      });

      res.render("products", {
        title: "Listado de Productos",
        products,
      });
    } catch (e) {
      console.error("Error al traer los productos:", e);
      res
        .status(500)
        .json({ error: "Ocurrió un error al encontrar los productos" });
    }
  }

  static async getCarts(_, res) {
    try {
      const data = await CartModel.find();

      const carts = data.map((cart) => {
        return {
          id: cart._doc._id,
          products: cart._doc.products.map((product) => ({
            productId: product.productId,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          })),
        };
      });

      res.render("carts", {
        title: "Listado de Carritos",
        carts,
      });
    } catch (e) {
      console.error("Error al traer los carritos:", e);
      res
        .status(500)
        .json({ error: "Ocurrió un error al encontrar los carritos" });
    }
  }

  static async getCart(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const data = await CartModel.findById(id);

      const oneCart = {
        id: data._id,
        products: data.products.map((product) => ({
          productId: product.productId,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
        })),
      };

      res.render("cart", {
        title: "Carrito",
        oneCart,
      });
    } catch (e) {
      console.error("Error al traer el carrito:", e);
      res
        .status(500)
        .json({ error: "Ocurrió un error al encontrar el carrito" });
    }
  }
}
