import CartModel from "../../../models/cartSchema.js";

export class DeleteController {
  // DELETE /carts/:cid - Eliminar el carrito
  static async deleteCart(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const action = await CartModel.deleteOne({
        _id: id,
      });
      if (action.deletedCount === 0) {
        res.status(404).json({
          data: null,
          message: "El carrito indicado no fue encontrado",
        });
        return;
      }
      res.status(200).json({
        data: null,
        message: "Carrito eliminado correctamente",
      });
    } catch (e) {
      console.error("Error al eliminar el carrito:", e);
      res
        .status(500)
        .json({ error: "Ocurrió un error al eliminar el carrito" });
    }
  }

  // DELETE /carts/:cid/products/:pid - Eliminar producto específico del carrito
  static async deleteProductFromCart(req, res) {
    const { 
      params: { id: cartId, pid: productId } 
    } = req;

    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        return res.status(404).json({ 
          error: 'Carrito no encontrado' 
        });
      }

      const initialLength = cart.products.length;
      cart.products = cart.products.filter(
        item => item.productId.toString() !== productId
      );

      if (cart.products.length === initialLength) {
        return res.status(404).json({ 
          error: 'Producto no encontrado en el carrito' 
        });
      }

      const updatedCart = await cart.save();
      await updatedCart.populate('products.productId');

      const filteredData = {
        id: updatedCart._id,
        products: updatedCart.products.map((product) => ({
          productId: product.productId._id,
          name: product.productId.name,
          price: product.productId.price,
          quantity: product.quantity,
        })),
      };

      res.status(200).json({
        data: filteredData,
        message: "Producto eliminado del carrito exitosamente",
      });
    } catch (e) {
      console.error("Error al eliminar producto del carrito:", e);
      res.status(500).json({ 
        error: "Ocurrió un error al eliminar el producto del carrito" 
      });
    }
  }
}