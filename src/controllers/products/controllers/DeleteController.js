import ProductModel from "../../../models/productSchema.js";

export class DeleteController {
  static async deleteProduct(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const action = await ProductModel.deleteOne({
        _id: id,
      });
      if (action.matchedCount === 0) {
        res.status(404).json({
          data: null,
          message: "El producto indicado no fue encontrado",
        });
        return;
      }
      res.status(201).json({
        data: null,
        message: "Producto eliminado correctamente",
      });
    } catch (e) {
      console.error("Error al eliminar el producto:", e);
      res
        .status(500)
        .json({ error: "Ocurrió un error al eliminar el productos" });
    }
  }
}
