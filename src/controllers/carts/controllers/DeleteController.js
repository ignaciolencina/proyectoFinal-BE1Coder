import CartModel from "../../../models/cartSchema.js";

export class DeleteController {
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
}