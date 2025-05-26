import ProductModel from "../../../models/productSchema.js";

export class GetController {
  static async getProducts(_, res) {
    try {
      const data = await ProductModel.find({
        isActive: true,
      });

      const filteredData = data.map((product) => {
        return {
          id: product._doc._id,
          name: product._doc.name,
          code: product._doc.code,
          price: product._doc.price,
          stock: product._doc.stock,
          category: product._doc.category,
        };
      });

      res.status(201).json({
        data: filteredData,
        message: "Lista de productos encontrada correctamente",
      });
    } catch (e) {
      console.error("Error al traer los productos:", e);
      res
        .status(500)
        .json({ error: "Ocurrió un error al encontrar los productos" });
    }
  }
}
