import ProductModel from "../../../models/productSchema.js";

export class PutController {
  static async putProduct(req, res) {
    const {
      body,
      params: { id },
    } = req;

    try {
      const action = await ProductModel.updateOne(
        {
          _id: id,
        },
        body
      );
      if (action.matchedCount === 0) {
        res.status(404).json({
          data: null,
          message: "El producto indicado no fue encontrado",
        });
        return;
      }
      res.status(200).json({
        data: null,
        message: "Producto actualizado correctamente",
      });
    } catch (e) {
      console.error("Error al actualizar prodcuto:", e);
      res.status(500).json({
        error: "Ocurrió un error al actualizar la informacion del producto",
      });
    }
  }
}
