import ProductModel from "../../../models/productSchema.js";

export class PostController {
  static async postProduct(req, res) {
    const { body } = req;

    const newProduct = new ProductModel({
      name: body.name,
      description: body.description,
      code: body.code,
      price: body.price,
      stock: body.stock,
      category: body.category,
      imageUrl: body.imageUrl,
    });

    try {
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
