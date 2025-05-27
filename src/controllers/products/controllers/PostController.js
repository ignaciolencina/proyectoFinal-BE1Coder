import ProductModel from "../../../models/productSchema.js";

export class PostController {
  static async postProduct(req, res) {
    const { body } = req;

    try {
      const requiredFields = [
        "name",
        "description",
        "code",
        "price",
        "stock",
        "category",
      ];
      const missingFields = requiredFields.filter((field) => !body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: `Campos requeridos faltantes: ${missingFields.join(", ")}`,
        });
      }

      const newProduct = new ProductModel({
        name: body.name,
        description: body.description,
        code: body.code,
        price: Number(body.price),
        stock: Number(body.stock),
        category: body.category,
        imageUrl: body.imageUrl,
      });

      await newProduct.save();

      res.status(201).json({
        data: newProduct,
        message: "Producto agregado correctamente",
      });
    } catch (e) {
      console.error("Error al guardar producto:", e);
      res
        .status(500)
        .json({ error: "Ocurrió un error al guardar el producto" });
    }
  }
}
