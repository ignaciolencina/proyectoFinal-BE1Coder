import CartModel from "../../../models/cartSchema.js";

export class PutController {
  // PUT /carts/:cid - Actualizar todos los productos del carrito
  static async updateCart(req, res) {
    const {
      body : {products},
      params: { id },
    } = req;

    try {
      if (!Array.isArray(products)) {
        return res.status(400).json({ 
          error: 'Products debe ser un array' 
        });
      }

      const formattedProducts = products.map(product => ({
        productId: product.productId || product.product,
        quantity: product.quantity
      }));

      const updatedCart = await CartModel.findByIdAndUpdate(
        id,
        { products: formattedProducts },
        { new: true, runValidators: true }
      ).populate('products.productId');

      if (!updatedCart) {
        return res.status(404).json({ 
          error: 'Carrito no encontrado' 
        });
      }

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
        message: "Carrito actualizado correctamente",
      });
    } catch (e) {
      console.error("Error al actualizar carrito:", e);
      res.status(500).json({
        error: "Ocurrió un error al actualizar el carrito",
      });
    }
  }

    // PUT /carts/:cid/products/:pid - Actualizar cantidad de producto específico
  static async updateProductQuantity(req, res) {
    const { 
      params: { id: cartId, pid: productId }, 
      body: { quantity } 
    } = req;

    try {
      if (!quantity || quantity < 0) {
        return res.status(400).json({ 
          error: 'La cantidad debe ser un número positivo' 
        });
      }

      const cart = await CartModel.findById(cartId);
      if (!cart) {
        return res.status(404).json({ 
          error: 'Carrito no encontrado' 
        });
      }

      const productIndex = cart.products.findIndex(
        item => item.productId.toString() === productId
      );

      if (productIndex === -1) {
        return res.status(404).json({ 
          error: 'Producto no encontrado en el carrito' 
        });
      }

      cart.products[productIndex].quantity = quantity;
      
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
        message: "Cantidad de producto actualizada correctamente",
      });
    } catch (e) {
      console.error("Error al actualizar cantidad del producto:", e);
      res.status(400).json({ 
        error: "Ocurrió un error al actualizar la cantidad del producto" 
      });
    }
  }
}
