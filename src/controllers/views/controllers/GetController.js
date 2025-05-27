import ProductModel from "../../../models/productSchema.js";
import CartModel from "../../../models/cartSchema.js";

export class GetController {
  static async getProducts(req, res) {
    try {
      const { limit = 10, page = 1, sort, query } = req.query;
      const limitNum = parseInt(limit);
      const pageNum = parseInt(page);

      let filter = { isActive: true };

      if (query) {
        filter.$and = [
          { isActive: true },
          {
            $or: [
              { name: { $regex: query, $options: "i" } },
              { description: { $regex: query, $options: "i" } },
              { category: { $regex: query, $options: "i" } },
              { code: { $regex: query, $options: "i" } },
            ],
          },
        ];
      }

      const options = {
        page: pageNum,
        limit: limitNum,
        lean: true,
        select: "name code price category",
      };

      if (sort) {
        const sortLower = sort.toLowerCase();
        if (sortLower === "asc" || sortLower === "ascendente") {
          options.sort = { price: 1 };
        } else if (sortLower === "desc" || sortLower === "descendente") {
          options.sort = { price: -1 };
        }
      }

      const result = await ProductModel.paginate(filter, options);

      const filteredData = result.docs.map((product) => ({
        id: product._id,
        name: product.name,
        code: product.code,
        price: product.price,
        stock: product.stock,
        category: product.category,
        description: product.description,
        imageUrl: product.imageUrl,
      }));

      const viewData = {
        products: filteredData,
        message: "Lista de productos encontrada correctamente",
        pagination: {
          currentPage: result.page,
          totalPages: result.totalPages,
          totalProducts: result.totalDocs,
          limit: result.limit,
          hasNextPage: result.hasNextPage,
          hasPrevPage: result.hasPrevPage,
          nextPage: result.nextPage,
          prevPage: result.prevPage,
        },
        filters: {
          query: query || null,
          sort: sort || null,
        },
        queryParams: req.query,
        currentUrl: req.originalUrl.split("?")[0],
      };

      res.status(200).render("products", viewData);
      console.log(viewData.pagination);
    } catch (e) {
      console.error("Error al traer los productos:", e);
      res.status(500).json({
        error: "Ocurrió un error al encontrar los productos",
      });
    }
  }

  static async getCarts(_, res) {
    try {
      const data = await CartModel.find().populate("products.productId");

      const carts = data.map((cart) => {
        return {
          id: cart._doc._id,
          products: cart._doc.products.map((product) => ({
            productId: product.productId._id,
            name: product.productId.name,
            price: product.productId.price,
            quantity: product.quantity,
          })),
        };
      });

      res.render("carts", {
        title: "Listado de Carritos",
        carts,
      });
      console.log(carts)
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
      const data = await CartModel.findById(id).populate("products.productId");

      const oneCart = {
        id: data._id,
        products: data.products.map((product) => ({
          productId: product.productId._id,
          name: product.productId.name,
          price: product.productId.price,
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
