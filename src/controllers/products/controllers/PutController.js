import ProductModel from "../../../models/productSchema.js";

export class PutController {
  static async putProduct(req, res) {
    const {
      body,
      params: { id },
    } = req;

    try {
      if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({
          error: "No se proporcionaron datos para actualizar",
        });
      }

      const updatedProduct = await ProductModel.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });

      if (!updatedProduct) {
        return res.status(404).json({
          data: null,
          message: "El producto indicado no fue encontrado",
        });
      }
      res.status(200).json({
        data: updatedProduct,
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
